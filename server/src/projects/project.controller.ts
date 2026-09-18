import type { Request, Response } from "express"
import type { CreateProjectBody, UpdateProjectBody } from "./project.types.js"
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

export const getMyAllProjectController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required",
        })
    }

    const result = await pool.query(
        `
            SELECT id, owner_id, name, description, created_at, updated_at
            FROM projects
            WHERE owner_id = $1
            ORDER BY created_at DESC
        `,
        [req.userId]
    )

    return res.status(200).json({
        message: "Here is your all projects",
        projects: result.rows,
    })
}

export const getProjectById = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required",
        })
    }

    const {id} = req.params;

    const result = await pool.query(
        `
            SELECT id, owner_id, name, description, created_at, updated_at
            FROM projects
            WHERE id = $1
                AND owner_id = $2
        `,
        [id, req.userId]
    )

    if(result.rows.length === 0) {
        return res.status(404).json({
            message: "Project not found",
        });
    }

    return res.status(200).json({
        message: "Succesfully found",
        project: result.rows[0],
    })
}

export const updateProjectController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {id} = req.params;
    const {name, description} = req.body as UpdateProjectBody;

    if(name === undefined && description === undefined) {
        return res.status(400).json({
            message: "At least one field is required"
        })
    }

    const result = await pool.query(
        `
            UPDATE projects
            SET name = COALESCE($1, name),
                description = COALESCE($2, description),
                updated_at = NOW()
            WHERE id = $3
                AND owner_id = $4
            RETURNING id, owner_id, name, description, created_at, updated_at
        `,
        [name ?? null, description ?? null, id, req.userId]
    )

    if(result.rows.length === 0) {
        return res.status(404).json({
            message: "Project not found"
        })
    }

    return res.status(200).json({
        message: "Project updated successfully",
        project: result.rows[0]
    })
}

export const deleteProjectController = async (req: Request, res: Response) => {
    if(!req.userId) {
        return res.status(401).json({
            message: "Authentication required"
        })
    }

    const {id} = req.params;

    const result = await pool.query(
        `
            DELETE FROM projects
            WHERE id = $1
                AND owner_id = $2
            RETURNING id
        `,
        [id, req.userId]
    )

    if(result.rows.length === 0) {
        return res.status(404).json({
            message: "Project not found"
        })
    }

    return res.status(200).json({
        message: "Project deleted successfully"
    })
}