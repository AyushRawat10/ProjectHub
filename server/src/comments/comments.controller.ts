import type { Request, Response } from "express";
import pool from "../config/database.js";
import type { CreateCommentBody } from "./comments.types.js";

export const createCommentController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {taskId} = req.params;
    const {content} = req.body as CreateCommentBody;

    if(!content?.trim()) {
        return res.status(400).json({
            message: "Comment content is required"
        })
    }

    const taskResult = await pool.query(
        `
            SELECT project_id
            FROM tasks
            WHERE id = $1
        `,
        [taskId]
    )

    if(taskResult.rows.length === 0) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    const projectId = taskResult.rows[0].project_id;

    const accessResult = await pool.query(
        `
            SELECT 1
            FROM projects
            WHERE id = $1
                AND owner_id = $2

            UNION

            SELECT 1
            FROM project_members
            WHERE project_id = $1
                AND user_id = $2
        `,
        [projectId, req.userId]
    )

    if(accessResult.rows.length === 0) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    const result = await pool.query(
        `
            INSERT INTO comments (
                task_id,
                user_id,
                content
            )
            VALUES ($1, $2, $3)
            RETURNING
                id,
                task_id,
                user_id,
                content,
                created_at,
                updated_at
        `,
        [taskId, req.userId, content.trim()]
    )

    return res.status(201).json({
        message: "Comment created successfully",
        comment: result.rows[0]
    })
}