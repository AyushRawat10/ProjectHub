import type { CookieOptions, Response, Request } from "express";
import pool from "../config/database.js";
import bcrypt from "bcrypt";
import type { RegisterBody, LoginBody } from "./auth.types.js";
import { generateSessionToken, hashSessionToken } from "./auth.utils.js";

export const register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body as RegisterBody;

    if(!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email and password are required"
        })
    }

    if(password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters"
        })
    }

    const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    );

    if(existingUser.rows.length > 0) {
        return res.status(409).json({
            message: "Email is already registered"
        });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
        `
        INSERT INTO users (name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, role, avatar_url, created_at
        `,
        [name, email, passwordHash]
    )

    const user = result.rows[0];

    return res.status(201).json({
        message: "User registered successfully",
        user
    })
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body as LoginBody;

    if(!email || !password) {
        res.status(400).json({
            message: "email and password are required"
        })
    }

    const emailFinder = await pool.query(
        `
            SELECT id, name, email, password_hash, role, avatar_url
            FROM users
            WHERE email = $1
        `,
        [email]
    );

    if(emailFinder.rows.length === 0) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const user = emailFinder.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const sessionToken = generateSessionToken();
    const tokenHash = hashSessionToken(sessionToken);

    await pool.query(
        `
            INSERT INTO user_sessions (user_id, token_hash, expires_at)
            VALUES ($1, $2, NOW() + INTERVAL '7 days')
        `,
        [user.id, tokenHash]
    )

    const options: CookieOptions = {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    res.cookie("session_token", sessionToken, options)

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar_url: user.avatar_url
        }
    })
}