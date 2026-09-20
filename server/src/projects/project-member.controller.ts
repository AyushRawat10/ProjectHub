import type { Request, Response } from "express";
import pool from "../config/database.js";

export const addMemberController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {id: projectId} = req.params;
    const {userId} = req.body as {userId: string};

    if(!userId) {
        return res.status(400).json({
            message: "User ID is required"
        })
    }

    const projectResult = await pool.query(
        `
            SELECT id
            FROM projects
            WHERE id = $1
                AND owner_id = $2
        `,
        [projectId, req.userId]
    )

    if(projectResult.rows.length === 0) {
        return res.status(404).json({
            message: "Project not found"
        })
    }

    const userResult = await pool.query(
        `
            SELECT id, name, email 
            FROM users
            WHERE id = $1
        `,
        [userId]
    )

    if(userResult.rows.length === 0) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const memberResult = await pool.query(
        `
            SELECT 1
            FROM project_members
            WHERE project_id = $1
                AND user_id = $2
        `,
        [projectId, userId]
    )

    if(memberResult.rows.length > 0) {
        return res.status(409).json({
            message: "User is already a member of this project"
        })
    }

    const result = await pool.query(
        `
            INSERT INTO project_members (project_id, user_id)
            VALUES ($1, $2)
            RETURNING project_id, user_id, joined_at
        `,
        [projectId, userId]
    )

    return res.status(201).json({
        message: "Member added successfully",
        member: result.rows[0]
    })
}

