import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/database.js";

dotenv.config({
	path: "./.env"
})

const PORT = process.env.PORT || 5001;

const startServer = async () => {
	try {
		await pool.query("SELECT NOW()");

		console.log("PostgreSQL connected");

		app.listen(PORT, () => {
			console.log("ProjectHub API is running on port : ", PORT);
		});
	} catch (error) {
        console.log("PostgreSQL connection FAILED !", error);
        process.exit(1);
    }
};

startServer();