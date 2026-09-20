import type { Request, Response } from "express";
import type { CreateTaskBody } from "./task.types.js";
import pool from "../config/database.js";

export const createTaskController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId } = req.params;
	const { title, description, assigneeId, status, priority, dueDate } =
		req.body as CreateTaskBody;

	if (!title) {
		return res.status(400).json({
			message: "Task title is required",
		});
	}

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
	);

	if (accessResult.rows.length === 0) {
		return res.status(404).json({
			message: "Project not found",
		});
	}

	if (assigneeId) {
		const memberResult = await pool.query(
			`
                SELECT 1
                FROM project_members
                WHERE project_id = $1
                    AND user_id = $2
            `,
			[projectId, assigneeId]
		);

		if (memberResult.rows.length === 0) {
			return res.status(400).json({
				message: "Assignee must be a member of the project",
			});
		}
	}

	const result = await pool.query(
		`
            INSERT INTO tasks (
                project_id, 
                creator_id, 
                assignee_id, 
                title, 
                description, 
                status, 
                priority, 
                due_date)
            VALUES (
                $1, 
                $2, 
                $3, 
                $4, 
                $5, 
                COALESCE($6, 'TODO')::task_status, 
                COALESCE($7, 'MEDIUM')::task_priority, 
                $8)
            RETURNING 
                id, 
                project_id, 
                creator_id, 
                assignee_id, 
                title, 
                description, 
                status, 
                priority, 
                due_date, 
                created_at, 
                updated_at
        `,
		[
			projectId,
			req.userId,
			assigneeId ?? null,
			title,
			description ?? null,
			status ?? null,
			priority ?? null,
			dueDate ?? null,
		]
	);

	return res.status(201).json({
		message: "Task created successfully",
		task: result.rows[0],
	});
};


