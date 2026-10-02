import type { CookieOptions, Response, Request } from "express";
import pool from "../config/database.js";
import bcrypt from "bcrypt";
import {
	generateAccessToken,
	generateRefreshToken,
	hashSessionToken,
	verifyRefreshToken,
	generateVerificationCode
} from "./auth.utils.js";
import { sendVerificationEmail } from "../service/email.service.js";

export const registerController = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	const client = await pool.connect();

	let user;
	let verificationCode: string;

	try {
		await client.query("BEGIN");

		const existingUser = await client.query(
			"SELECT id FROM users WHERE email = $1",
			[email]
		);
	
		if (existingUser.rows.length > 0) {
			await client.query("ROLLBACK");

			return res.status(409).json({
				message: "Email is already registered",
			});
		}
	
		const passwordHash = await bcrypt.hash(password, 12);
	
		try {
			const result = await client.query(
				`
				INSERT INTO users (name, email, password_hash, email_verified)
				VALUES ($1, $2, $3, FALSE)
				RETURNING id, name, email, role, avatar_url, email_verified, created_at
				`,
				[name, email, passwordHash]
			);

			user = result.rows[0];
		} catch (error: any) {
			if(error.code === "23505") {
				await client.query("ROLLBACK");

				return res.status(409).json({
					message: "Email is already registered"
				})
			}
	
			throw error;
		}
		
		verificationCode = generateVerificationCode();
		const verificationCodeHash = hashSessionToken(verificationCode);
	
		await client.query(
			`
				INSERT INTO email_verification_codes (user_id, code_hash, expires_at)
				VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
			`,
			[user.id, verificationCodeHash]
		)

		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}

	try {
		await sendVerificationEmail( email, verificationCode );
		console.log("Verification email sent successfully to:", email);
	} catch (error) {
		console.error("Failed to send verification email:", error);

		await pool.query(
			`
				DELETE FROM email_verification_codes
				WHERE user_id = $1
			`,
			[user.id]
		);

		return res.status(503).json({
			message: "Account created, but verification email could not be sent. Please try again later or resend the verification email."
		})
	}

	
	return res.status(201).json({
		message: "Registration successful. Please verify your email",
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			email_verified: user.email_verified
		}
	});
};

export const verifyEmailController = async (req: Request, res: Response) => {
	const {email, code} = req.body;

	const userResult = await pool.query(
		`
			SELECT id, email_verified
			FROM users
			WHERE email = $1
		`,
		[email]
	)

	if(userResult.rows.length === 0) {
		return res.status(400).json({
			message: "Invalid verification request"
		})
	}

	const user = userResult.rows[0];

	if(user.email_verified) {
		return res.status(400).json({
			message: "Email is already verified"
		})
	}

	const codeResult = await pool.query(
		`
			SELECT id, code_hash, attempts
			FROM email_verification_codes
			WHERE user_id = $1
				AND expires_at > NOW()
			ORDER BY created_at DESC
			LIMIT 1
		`,
		[user.id]
	);
	
	if(codeResult.rows.length === 0) {
		return res.status(400).json({
			message: "Invalid or expired verification code"
		})
	}
	
	const verification = codeResult.rows[0];
	
	if(verification.attempts >= 5) {
		return res.status(429).json({
			message: "Too many attempts. Please request a new code."
		})
	}
	
	const codeHash = hashSessionToken(code);

	if(codeHash !== verification.code_hash) {
		await pool.query(
			`
				UPDATE email_verification_codes
				SET attempts = attempts + 1
				WHERE id = $1
					AND attempts < 5
			`,
			[verification.id]
		)

		return res.status(400).json({
			message: "Invalid verification code"
		})
	}

	const client = await pool.connect();

	try {
		await client.query("BEGIN");
		
		const updateResult = await client.query(
			`
				UPDATE users
				SET email_verified = TRUE,
					updated_at = NOW()
				WHERE id = $1
					AND email_verified = FALSE
				RETURNING id
			`,
			[user.id]
		);

		if(updateResult.rows.length === 0) {
			await client.query("ROLLBACK");

			return res.status(400).json({
				message: "Email is already verified"
			})
		}
	
		await client.query(
			`
				DELETE FROM email_verification_codes
				WHERE user_id = $1
			`,
			[user.id]
		)

		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}

	return res.status(200).json({
		message: "Email verified successfully"
	})
};

export const loginController = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const emailFinder = await pool.query(
		`
            SELECT id, name, email, password_hash, role, avatar_url, email_verified
            FROM users
            WHERE email = $1
        `,
		[email]
	);

	if (emailFinder.rows.length === 0) {
		return res.status(401).json({
			message: "Invalid email or password",
		});
	}

	const user = emailFinder.rows[0];

	if (!user.email_verified) {
		return res.status(403).json({
			message: "Please verify your email before logging in"
		});
	}

	const isPasswordValid = await bcrypt.compare(password, user.password_hash);

	if (!isPasswordValid) {
		return res.status(401).json({
			message: "Invalid email or password",
		});
	}

	const accessToken = generateAccessToken(user.id);
	const refreshToken = generateRefreshToken(user.id);
	const refreshTokenHash = hashSessionToken(refreshToken);

	await pool.query(
		`
            INSERT INTO user_sessions (user_id, refresh_token_hash, expires_at)
            VALUES ($1, $2, NOW() + INTERVAL '7 days')
        `,
		[user.id, refreshTokenHash]
	);

	const options: CookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/api/auth",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	};

	res.cookie("refresh_token", refreshToken, options);

	return res.status(200).json({
		message: "Login successful",
		accessToken,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			avatar_url: user.avatar_url,
		},
	});
};

export const getMeController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Unauthorized",
		});
	}

	const result = await pool.query(
		`
            SELECT id, name, email, role, avatar_url, email_verified, created_at
            FROM users
            WHERE id = $1
        `,
		[req.userId]
	);

	if (result.rows.length === 0) {
		return res.status(404).json({
			message: "User not found",
		});
	}

	return res.status(200).json({
		user: result.rows[0],
	});
};

export const refreshAccessTokenController = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refresh_token;

	if (!refreshToken) {
		return res.status(401).json({
			message: "Refresh token required",
		});
	}

	try {
		const { userId } = verifyRefreshToken(refreshToken);

		const oldRefreshTokenHash = hashSessionToken(refreshToken);

		const client = await pool.connect();

		let newRefreshToken: string;
		let accessToken: string;

		try {
			await client.query("BEGIN");

			const result = await client.query(
				`
				UPDATE user_sessions
				SET revoked_at = NOW()
				WHERE user_id = $1
					AND refresh_token_hash = $2
					AND expires_at > NOW()
					AND revoked_at IS NULL
				RETURNING id
				`,
				[userId, oldRefreshTokenHash]
			);
	
			if (result.rows.length === 0) {
				await client.query("ROLLBACK");

				return res.status(401).json({
					message: "Invalid or expired refresh token",
				});
			}
	
			accessToken = generateAccessToken(userId);
			newRefreshToken = generateRefreshToken(userId);
			const newRefreshTokenHash = hashSessionToken(newRefreshToken);
	
			await client.query(
				`
					INSERT INTO user_sessions (user_id, refresh_token_hash, expires_at)	
					VALUES ($1, $2, NOW() + INTERVAL '7 days')
				`,
				[userId, newRefreshTokenHash]
			)

			await client.query("COMMIT");
		} catch (error) {
			await client.query("ROLLBACK");
			throw error;
		} finally {
			client.release();
		}

		const options: CookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/api/auth",
			maxAge: 7 * 24 * 60 * 60 * 1000
		};

		res.cookie("refresh_token", newRefreshToken, options)

		return res.status(200).json({
			accessToken,
			message: "Access token refreshed successfully"
		});

	} catch (error) {
		console.error("Refresh token error:", error);

		return res.status(401).json({
			message: "Invalid refresh token",
		});
	}
};

export const resendVerificationController = async (req: Request, res: Response) => {
	const {email} = req.body;

	const userResult = await pool.query(
		`
			SELECT id, email_verified
			FROM users
			WHERE email = $1
		`,
		[email]
	)

	if(userResult.rows.length === 0) {
		return res.status(400).json({
			message: "Invalid verification request"
		})
	}

	const user = userResult.rows[0];

	if(user.email_verified) {
		return res.status(400).json({
			message: "Email is already verified"
		})
	}

	const verificationCode = generateVerificationCode();
	const codeHash = hashSessionToken(verificationCode);

	const client = await pool.connect();

	try {
		await client.query("BEGIN");
		
		await client.query(
			`
				DELETE FROM email_verification_codes
				WHERE user_id = $1
			`,
			[user.id]
		);
	
		await client.query(
			`
				INSERT INTO email_verification_codes (user_id, code_hash, expires_at)
				VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
			`,
			[user.id, codeHash]
		)

		await client.query("COMMIT");
	} catch (error) {
		await client.query("ROLLBACK");
		throw error;
	} finally {
		client.release();
	}

	try {
		await sendVerificationEmail( email, verificationCode );
	} catch (error) {
		console.error("Failed to send verification email:", error);

		await pool.query(
			`
				DELETE FROM email_verification_codes
				WHERE user_id = $1
			`,
			[user.id]
		);

		return res.status(503).json({
			message: "Verification email could not be sent. Please try again later or resend the verification email."
		})
	}

	return res.status(200).json({
		message: "A new verification code has been generated"
	});
}

export const logoutController = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refresh_token;

	if(refreshToken) {
		const refreshTokenHash = hashSessionToken(refreshToken);

		await pool.query(
			`
				UPDATE user_sessions
				SET revoked_at = NOW()
				WHERE refresh_token_hash = $1
					AND revoked_at IS NULL
			`,
			[refreshTokenHash]
		)
	}

	const options: CookieOptions = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/api/auth"
	}

	res.clearCookie("refresh_token", options)

	return res.status(200).json({
		message: "Logged out successfully",
	});
}
