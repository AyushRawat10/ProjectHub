import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./auth/auth.routes.js";
import projectRoutes from "./projects/project.routes.js";
import projectMemberRoutes from "./project-members/project-member.routes.js";
import taskRoutes from "./tasks/task.routes.js";
import commentRoutes from "./comments/comments.routes.js";

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
app.use("/api/projects", projectMemberRoutes)
app.use("/api/projects", taskRoutes)
app.use("/api/tasks", commentRoutes)

export default app;