import type { Request, Response } from "express";
import pool from "../config/database.js";
import { getProjectRole } from "./project-member.permissions.js";

export const addMemberController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId } = req.params;
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({
			message: "User ID is required",
		});
	}

	if(projectId && typeof projectId === "string") {
		const requesterRole = await getProjectRole(projectId, req.userId);

		if(!requesterRole) {
			return res.status(404).json({
				message: "Project not found",
			})
		}

		if (requesterRole !== "OWNER" && requesterRole !== "ADMIN") {
			return res.status(403).json({
				message: "Only the project owner or an admin can invite members",
			})
		}
	}

	if(userId === req.userId) {
		return res.status(400).json({
			message: "Project owner is already a member by default"
		})
	}

	const userResult = await pool.query(
		`
            SELECT id, name, email 
            FROM users
            WHERE id = $1
        `,
		[userId]
	);

	if (userResult.rows.length === 0) {
		return res.status(404).json({
			message: "User not found",
		});
	}

	const memberResult = await pool.query(
		`
            SELECT 1
            FROM project_members
            WHERE project_id = $1
                AND user_id = $2
        `,
		[projectId, userId]
	);

	if (memberResult.rows.length > 0) {
		return res.status(409).json({
			message: "User is already a member of this project",
		});
	}

	try {
		const result = await pool.query(
			`
				INSERT INTO project_members (project_id, user_id)
				VALUES ($1, $2)
				RETURNING project_id, user_id, joined_at
			`,
			[projectId, userId]
		);

		return res.status(201).json({
			message: "Member added successfully",
			member: result.rows[0],
		});
	} catch (error: any) {
		if (error.code === "23505") {
			return res.status(409).json({
				message: "User is already a member of this project",
			});
		}

		throw error;
	}
	
};

export const getAllProjectMembersController = async (
	req: Request,
	res: Response
) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId } = req.params;

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
                u.id,
                u.name,
                u.email,
                u.avatar_url,
				pm.role,
                pm.joined_at
            FROM project_members pm
            JOIN users u
                ON u.id = pm.user_id
            WHERE pm.project_id = $1
            ORDER BY pm.joined_at ASC
        `,
		[projectId]
	);

	return res.status(200).json({
		message: "List of all members",
		members: result.rows,
	});
};

export const removeMemberController = async (req: Request, res: Response) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId, userId } = req.params;

	if(!projectId || typeof projectId !== "string") {
		return res.status(400).json({
			message: "Project ID is required",
		})
	}

	const requesterRole = await getProjectRole(projectId, req.userId);

	if (!requesterRole) {
		return res.status(404).json({
			message: "Project not found"
		})
	}

	if (requesterRole === "MEMBER") {
		return res.status(403).json({
			message: "Only the project owner or an admin can remove members",
		})
	}

	if (userId === req.userId) {
		return res.status(400).json({
			message: "You cannot remove yourself using this endpoint",
		});
	}

	if (requesterRole === "ADMIN") {
		const targetResult = await pool.query(
			`
				SELECT role
				FROM project_members
				WHERE project_id = $1
					AND user_id = $2
			`,
			[projectId, userId]
		);

		if (targetResult.rows.length === 0) {
			return res.status(404).json({
				message: "Member not found in this project",
			});
		}

		if (targetResult.rows[0].role !== "MEMBER") {
			return res.status(403).json({
				message: "Admins can only remove regular members",
			});
		}
	}

	const result = await pool.query(
		`
            DELETE FROM project_members
            WHERE project_id = $1
                AND user_id = $2
            RETURNING project_id, user_id
        `,
		[projectId, userId]
	);

	if (result.rows.length === 0) {
		return res.status(404).json({
			message: "Member not found in this project",
		});
	}

	return res.status(200).json({
		message: "Member removed successfully",
	});
};

export const updateMemberRoleController = async (
	req: Request,
	res: Response
) => {
	if (!req.userId) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	const { id: projectId, userId } = req.params;
	const { role } = req.body;

	if (role !== "ADMIN" && role !== "MEMBER") {
		return res.status(400).json({
			message: "Role must be ADMIN or MEMBER",
		});
	}

	try {
		const projectResult = await pool.query(
			`
				SELECT id 
				FROM projects
				WHERE id = $1
					AND owner_id = $2
			`,
			[projectId, req.userId]
		);

		if (projectResult.rows.length === 0) {
			return res.status(403).json({
				message: "Only the project owner can change member roles",
			})
		}

		const targetResult = await pool.query(
			`
				SELECT user_id
				FROM project_members
				WHERE project_id = $1
					AND user_id = $2
			`,
			[projectId, userId]
		);

		if (targetResult.rows.length === 0) {
			return res.status(404).json({
				message: "Member not found in this project",
			})
		}

		const result = await pool.query(
			`
				UPDATE project_members
				SET role = $3
				WHERE project_id = $1
					AND user_id = $2
				RETURNING project_id, user_id, role
			`,
			[projectId, userId, role]
		);

		return res.status(200).json({
			message: "Member role updated successfully",
			member: result.rows[0],
		});
	} catch (error) {
		console.error("Update member role error:", error);

		return res.status(500).json({
			message: "Internal server error",
		})
	}
}