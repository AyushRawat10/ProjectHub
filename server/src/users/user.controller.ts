import type { Request, Response } from "express";
import pool from "../config/database.js";

export const getAvailableUsersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const { projectId, search } = req.query;

        if (!userId) {
            res.status(401).json({
                message: "Unauthorized",
            });
            return;
        }

        if (
            typeof projectId !== "string" ||
            typeof search !== "string" ||
            search.trim().length < 2
        ) {
            res.status(400).json({
                message: "projectId and a search term of at least 2 characters are required",
            });
            return;
        }

        const projectAccess = await pool.query(
            `
                SELECT 1
                FROM projects p
                WHERE p.id = $1
                    AND (
                        p.owner_id = $2
                        OR EXISTS (
                            SELECT 1
                            FROM project_members pm
                            WHERE pm.project_id = p.id
                                AND pm.user_id = $2
                        )
                    )  
            `,
            [projectId, userId]
        )

        if (projectAccess.rowCount === 0) {
            res.status(403).json({
                message: "You do not have access to this project",
            });
            return;
        }

        const result = await pool.query(
            `
                SELECT
                    u.id,
                    u.name,
                    u.email,
                    u.avatar_url
                FROM users u
                WHERE u.email_verified = TRUE
                    AND u.id <> $2
                    AND (
                        u.name ILIKE $3
                        OR u.email ILIKE $3
                    )
                    AND NOT EXISTS (
                        SELECT 1
                        FROM project_members pm
                        WHERE pm.project_id = $1
                            AND pm.user_id = u.id
                    )
                    AND u.id <> (
                        SELECT p.owner_id
                        FROM projects p
                        WHERE p.id = $1
                    )
                ORDER BY u.name ASC
                LIMIT 20
            `,
            [projectId, userId, `%${search.trim()}%`]
        );

        res.status(200).json({
            message: "Available users retrieved successfully",
            users: result.rows,
        });
    } catch (error) {
        console.error("Get available users error:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
};