import type { Request, Response } from "express";
import pool from "../config/database.js";

export const createTaskController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId } = req.params;
	const { title, description, assigneeId, status, priority, dueDate } =
		req.body;

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
                FROM projects
                WHERE id = $1
                    AND owner_id = $2

                UNION

                SELECT 1
                FROM project_members
                WHERE project_id = $1
                    AND user_id = $2
            `,
			[projectId, assigneeId]
		);

		if (memberResult.rows.length === 0) {
			return res.status(400).json({
				message: "Assignee must be the project owner or a project member",
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

    if(!projectId || Array.isArray(projectId)) {
        return res.status(400).json({
            message: "Invalid project ID"
        })
    }

	const { search, status, priority } = req.query;
    const { sortBy, order } = req.query;

    const allowedSortColumns = {
        created_at: "t.created_at",
        updated_at: "t.updated_at",
        due_date: "t.due_date",
        title: "t.title",
    } as const;

    const sortColumn = typeof sortBy === "string" && sortBy in allowedSortColumns 
                            ? allowedSortColumns[sortBy as keyof typeof allowedSortColumns]
                            : "t.created_at";

    const sortOrder = order === "asc" ? "ASC" : "DESC";

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
        ORDER BY ${sortColumn} ${sortOrder}
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
		req.body;

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
            SELECT 
                t.creator_id,
                t.assignee_id,
                p.owner_id,
                pm.role AS member_role
            FROM tasks t
            JOIN projects p
                ON p.id = t.project_id
            LEFT JOIN project_members pm
                ON pm.project_id = p.id
                AND pm.user_id = $3
            WHERE t.id = $1
                AND t.project_id = $2
        `,
		[taskId, projectId, req.userId]
	);

	if (taskResult.rows.length === 0) {
		return res.status(404).json({
			message: "Task not found",
		});
	}

    const task = taskResult.rows[0];

    const isProjectOwner = task.owner_id === req.userId;
    const isProjectAdmin = task.member_role === "ADMIN";

    const isTaskCreator = task.creator_id === req.userId;
    const isTaskAssignee = task.assignee_id === req.userId;

    const canEditTask = 
        isProjectOwner || 
        isProjectAdmin || 
        isTaskCreator || 
        isTaskAssignee;

    if (!canEditTask) {
        return res.status(403).json({
            message: "You do not have permission to edit this task",
        })
    }

	if (assigneeId) {
		const memberResult = await pool.query(
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
			[projectId, assigneeId]
		);

		if (memberResult.rows.length === 0) {
			return res.status(400).json({
				message: "Assignee must be the project owner or a project member",
			});
		}
	}

	const result = await pool.query(
		`
            UPDATE tasks
            SET 
                title = CASE
                    WHEN $1::boolean THEN $2
                    ELSE title
                END,
                description = CASE
                    WHEN $3::boolean THEN $4
                    ELSE description
                END,
                assignee_id = CASE
                    WHEN $5::boolean THEN $6::uuid
                    ELSE assignee_id
                END,
                status = CASE
                    WHEN $7::boolean THEN $8::task_status
                    ELSE status
                END,
                priority = CASE
                    WHEN $9::boolean THEN $10::task_priority
                    ELSE priority
                END,
                due_date = CASE
                    WHEN $11::boolean THEN $12::date
                    ELSE due_date
                END,
                updated_at = NOW()
            WHERE id = $13
                AND project_id = $14

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
			title !== undefined, title ?? null,
			description !== undefined, description ?? null,
			assigneeId !== undefined, assigneeId ?? null,
			status !== undefined, status ?? null,
			priority !== undefined, priority ?? null,
			dueDate !== undefined, dueDate ?? null,
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
                    OR EXISTS (
                        SELECT 1
                        FROM project_members pm
                        WHERE pm.project_id = t.project_id
                            AND pm.user_id = $3
                            AND pm.role = 'ADMIN'
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
