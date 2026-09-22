import type { Request, Response } from "express";
import type { CreateTaskBody, UpdateTaskBody } from "./task.types.js";
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

export const getProjectTasksController = async (
	req: Request,
	res: Response
) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId } = req.params;
	const { search, status, priority } = req.query;
    console.log(search)

    if(!projectId || Array.isArray(projectId)) {
        return res.status(400).json({
            message: "Invalid project ID"
        })
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


    const values: string[] = [projectId];

	let query = 
		`
            SELECT 
                t.id,
                t.project_id,
                t.creator_id,
                t.assignee_id,
                t.title,
                t.description,
                t.status,
                t.priority,
                t.due_date,
                t.created_at,
                t.updated_at,
                creator.name AS creator_name,
                assignee.name AS assignee_name
            FROM tasks t
            JOIN users creator
                ON creator.id = t.creator_id
            LEFT JOIN users assignee
                ON assignee.id = t.assignee_id
            WHERE t.project_id = $1
        `;

    if(typeof search === "string" && search.trim()) {
        values.push(`%${search.trim()}%`)

        query += `
            AND (
                t.title ILIKE $2
                OR t.description ILIKE $2
            )
        `;
    }

    if(typeof status === "string" && status.trim()) {
        values.push(status);

        query += `
            AND t.status = $${values.length}::task_status
        `;
    }

    if(typeof priority === "string" && priority.trim()) {
        values.push(priority);

        query += `
            AND t.priority = $${values.length}::task_priority
        `;
    }

    query += `
        ORDER BY t.created_at DESC
    `;

    const result = await pool.query(query, values);

	return res.status(200).json({
		message: "List of tasks",
		tasks: result.rows,
	});
};

export const getTaskByIdController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId, taskId } = req.params;

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

	const result = await pool.query(
		`
            SELECT 
                t.id,
                t.project_id,
                t.creator_id,
                t.assignee_id,
                t.title,
                t.description,
                t.status,
                t.priority,
                t.due_date,
                t.created_at,
                t.updated_at,
                creator.name AS creator_name,
                assignee.name AS assignee_name
            FROM tasks t
            JOIN users creator
                ON creator.id = t.creator_id
            LEFT JOIN users assignee
                ON assignee.id = t.assignee_id
            WHERE t.id = $1
                AND t.project_id = $2
        `,
		[taskId, projectId]
	);

	if (result.rows.length === 0) {
		return res.status(404).json({
			message: "Task not found",
		});
	}

	return res.status(200).json({
		message: "Task retrieved successfully",
		task: result.rows[0],
	});
};

export const updateTaskController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId, taskId } = req.params;

	const { title, description, assigneeId, status, priority, dueDate } =
		req.body as UpdateTaskBody;

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

	const taskResult = await pool.query(
		`
            SELECT 1
            FROM tasks
            WHERE id = $1
                AND project_id = $2
        `,
		[taskId, projectId]
	);

	if (taskResult.rows.length === 0) {
		return res.status(404).json({
			message: "Task not found",
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
            UPDATE tasks
            SET 
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                assignee_id = COALESCE($3, assignee_id),
                status = COALESCE($4, status)::task_status,
                priority = COALESCE($5, priority)::task_priority,
                due_date = COALESCE($6, due_date),
                updated_at = NOW()
            WHERE id = $7
                AND project_id = $8

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
			title ?? null,
			description ?? null,
			assigneeId ?? null,
			status ?? null,
			priority ?? null,
			dueDate ?? null,
			taskId,
			projectId,
		]
	);

	return res.status(200).json({
		message: "Task updated successfully",
		task: result.rows[0],
	});
};

export const deleteTaskController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId, taskId } = req.params;

	const result = await pool.query(
		`
            DELETE FROM tasks t
            WHERE t.id = $1
                AND t.project_id = $2
                AND (
                    EXISTS (
                        SELECT 1
                        FROM projects p
                        WHERE p.id = t.project_id
                            AND p.owner_id = $3
                    )
                    OR t.creator_id = $3
                )

            RETURNING 
                t.id,
                t.project_id,
                t.title
        `,
		[taskId, projectId, req.userId]
	);

	if (result.rows.length === 0) {
		return res.status(404).json({
			message: "Task not found or you don't have permission to delete it",
		});
	}

	return res.status(200).json({
		message: "Task deleted successfully",
		task: result.rows[0],
	});
};
