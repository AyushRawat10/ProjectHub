import type { Request, Response } from "express";
import pool from "../config/database.js";
import type { CreateCommentBody, UpdateCommentBody } from "./comments.types.js";

export const createCommentsController = async (req: Request, res: Response) => {
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

export const getTaskCommentsController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {taskId} = req.params;
    
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
            SELECT
                c.id,
                c.task_id,
                c.user_id,
                c.content,
                c.created_at,
                c.updated_at,
                u.name AS user_name
            FROM comments c
            JOIN users u
                ON u.id = c.user_id
            WHERE c.task_id = $1
            ORDER BY c.created_at ASC
        `,
        [taskId]
    )

    return res.status(200).json({
        message: "Comments retrieved successfully",
        comments: result.rows,
    })
}

export const updateCommentsController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {taskId, commentId} = req.params;
    const {content} = req.body as UpdateCommentBody;

    if(!content?.trim()) {
        return res.status(400).json({
            message: "Comment content is required"
        })
    }

    const result = await pool.query(
        `
            UPDATE comments
            SET
                content = $1,
                updated_at = NOW()
            WHERE id = $2
                AND task_id = $3
                AND user_id = $4
            RETURNING
                id,
                task_id,
                user_id,
                content,
                created_at,
                updated_at
        `,
        [
            content.trim(),
            commentId,
            taskId,
            req.userId
        ]
    )

    if(result.rows.length === 0) {
        return res.status(404).json({
            message: "Comment not found or you don't have permission to edit it"
        })
    }

    return res.status(200).json({
        message: "Comment updated successfully",
        comment: result.rows[0]
    })
}

export const deleteCommentsController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {taskId, commentId} = req.params;

    const result = await pool.query(
        `
            DELETE FROM comments
            WHERE id = $1
                AND task_id = $2
                AND user_id = $3
            RETURNING
                id,
                task_id,
                user_id,
                content
        `,
        [commentId, taskId, req.userId]
    )

    if(result.rows.length === 0) {
        return res.status(404).json({
            message: "Comment not found or you don't have permission to delete it"
        })
    }

    return res.status(200).json({
        message: "Comment deleted successfully",
        comment: result.rows[0]
    })
}