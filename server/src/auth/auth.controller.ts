import type { Response, Request } from "express";
import pool from "../config/database.js";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

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