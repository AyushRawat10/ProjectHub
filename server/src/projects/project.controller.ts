import type { Request, Response } from "express"
import type { CreateProjectBody } from "./project.types.js"
import pool from "../config/database.js";

export const createProjectController = async (req: Request, res: Response) => {
    const {name, description} = req.body as CreateProjectBody;

    if(!name) {
        return res.status(400).json({
            message: "Project name is required"
        })
    }

    const result = await pool.query(
        `
            INSERT INTO projects (owner_id, name, description)
            VALUES ($1, $2, $3)
            RETURNING id, owner_id, name, description, created_at, updated_at
        `,
        [req.userId, name, description ?? null]
    )

    return res.status(201).json({
        message: "Project created successfully",
        project: result.rows[0]
    })
}

