import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.routes.js";
import projectRoutes from "./projects/project.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        message: "ProjectHub API is running"
    })
})

app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)

export default app;