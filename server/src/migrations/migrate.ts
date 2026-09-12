import fs from "node:fs/promises";
import path from "node:path";
import pool from "../config/database.js";

const migrationsDir = path.join(process.cwd(), "db", "migrations");

const migrate = async () => {
	const client = await pool.connect();

	try {
		await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

		const files = await fs.readdir(migrationsDir);

		const migrationFiles = files
			.filter((file) => file.endsWith(".sql"))
			.sort();

		for (const file of migrationFiles) {
			const result = await client.query(
				"SELECT 1 FROM schema_migrations WHERE filename = $1",
				[file]
			);

			if (typeof result.rowCount === "number") {
				if (result.rowCount > 0) {
					console.log(`Already applied: ${file}`);
					continue;
				}
			}

			const filePath = path.join(migrationsDir, file);
			const sql = await fs.readFile(filePath, "utf-8");

			await client.query("BEGIN");

			try {
				await client.query(sql);

				await client.query(
					"INSERT INTO schema_migrations (filename) VALUES ($1)",
					[file]
				);

				await client.query("COMMIT");

				console.log(`Applied: ${file}`);
			} catch (error) {
				await client.query("ROLLBACK");
				throw error;
			}
		}

		console.log("Migrations completed");
	} finally {
		client.release();
		await pool.end();
	}
};

migrate().catch((error) => {
	console.error("Migration failed:", error);
	process.exit(1);
});
