import pool from "../config/database.js";

export type ProjectRole = "OWNER" | "ADMIN" | "MEMBER";

export const getProjectRole = async (
  projectId: string,
  userId: string
): Promise<ProjectRole | null> => {
  const result = await pool.query<{ role: ProjectRole }>(
    `
    SELECT 'OWNER' AS role
    FROM projects
    WHERE id = $1
      AND owner_id = $2

    UNION ALL

    SELECT role
    FROM project_members
    WHERE project_id = $1
      AND user_id = $2

    LIMIT 1
    `,
    [projectId, userId]
  );

  return result.rows[0]?.role ?? null;
};