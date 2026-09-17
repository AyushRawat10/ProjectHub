import type { CookieOptions, Response, Request } from "express";
import pool from "../config/database.js";
import bcrypt from "bcrypt";
import type { RegisterBody, VerifyEmailBody, LoginBody } from "./auth.types.js";
import {
	generateAccessToken,
	generateRefreshToken,
	hashSessionToken,
	verifyRefreshToken,
	generateVerificationCode
} from "./auth.utils.js";
import { sendVerificationEmail } from "../service/email.service.js";

export const registerController = async (req: Request, res: Response) => {
	const { name, email, password } = req.body as RegisterBody;

	if (!name || !email || !password) {
		return res.status(400).json({
			message: "Name, email and password are required",
		});
	}

	if (password.length < 8) {
		return res.status(400).json({
			message: "Password must be at least 8 characters",
		});
	}

	const existingUser = await pool.query(
		"SELECT id FROM users WHERE email = $1",
		[email]
	);

	if (existingUser.rows.length > 0) {
		return res.status(409).json({
			message: "Email is already registered",
		});
	}

	const passwordHash = await bcrypt.hash(password, 12);

	const result = await pool.query(
		`
        INSERT INTO users (name, email, password_hash, email_verified)
        VALUES ($1, $2, $3, FALSE)
        RETURNING id, name, email, role, avatar_url, email_verified, created_at
        `,
		[name, email, passwordHash]
	);
	
	const user = result.rows[0];

	const verificationCode = generateVerificationCode();
	const verificationCodeHash = hashSessionToken(verificationCode);

	await pool.query(
		`
			INSERT INTO email_verification_codes (user_id, code_hash, expires_at)
			VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
		`,
		[user.id, verificationCodeHash]
	)

	await sendVerificationEmail( email, verificationCode );
	
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
	const {email, code} = req.body as VerifyEmailBody;

	if(!email || !code) {
		return res.status(400).json({
			message: "Email and verification code are required"
		})
	}

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
			`,
			[verification.id]
		)

		return res.status(400).json({
			message: "Invalid verification code"
		})
	}

	await pool.query(
		`
			UPDATE users
			SET email_verified = TRUE,
				updated_at = NOW()
			WHERE id = $1
		`,
		[user.id]
	);

	await pool.query(
		`
			DELETE FROM email_verification_codes
			WHERE user_id = $1
		`,
		[user.id]
	)

	return res.status(200).json({
		message: "Email verified successfully"
	})
};

export const loginController = async (req: Request, res: Response) => {
	const { email, password } = req.body as LoginBody;

	if (!email || !password) {
		res.status(400).json({
			message: "email and password are required",
		});
	}

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
		secure: false,
		sameSite: "lax",
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
            SELECT id, name, email, role, avatar_url, created_at
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

		const result = await pool.query(
			`
            SELECT id 
            FROM user_sessions
            WHERE user_id = $1
                AND refresh_token_hash = $2
                AND expires_at > NOW()
                AND revoked_at IS NULL
            `,
			[userId, oldRefreshTokenHash]
		);

		if (result.rows.length === 0) {
			return res.status(401).json({
				message: "Invalid or expired refresh token",
			});
		}

		const sessionId = result.rows[0].id;

		await pool.query(
			`
				UPDATE user_sessions
				SET revoked_at = NOW()
				WHERE id = $1
			`,
			[sessionId]
		)

		const accessToken = generateAccessToken(userId);
		const newRefreshToken = generateRefreshToken(userId);
		const newRefreshTokenHash = hashSessionToken(newRefreshToken);

		await pool.query(
			`
				INSERT INTO user_sessions (user_id, refresh_token_hash, expires_at)	
				VALUES ($1, $2, NOW() + INTERVAL '7 days')
			`,
			[userId, newRefreshTokenHash]
		)

		const options: CookieOptions = {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000
		};

		res.cookie("refresh_token", newRefreshToken, options)

		return res.status(200).json({
			accessToken,
			message: "Generate new access token successfully"
		});

	} catch (error) {
		return res.status(401).json({
			message: "Invalid refresh token",
		});
	}
};

export const resendVerificationController = async (req: Request, res: Response) => {
	const {email} = req.body as {email: string};

	if(!email) {
		return res.status(400).json({
			message: "Email is required"
		})
	}

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
			message: "Invalid verificaion request"
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

	await pool.query(
		`
			DELETE FROM email_verification_codes
			WHERE user_id = $1
		`,
		[user.id]
	);

	await pool.query(
		`
			INSERT INTO email_verification_codes (user_id, code_hash, expires_at)
			VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
		`,
		[user.id, codeHash]
	)

	await sendVerificationEmail( email, verificationCode );

	return res.status(200).json({
		message: "A new verification code has been generated"
	});
}
