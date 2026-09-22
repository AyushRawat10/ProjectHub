import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import {
	createTaskController,
	deleteTaskController,
	getProjectTasksController,
	getTaskByIdController,
	updateTaskController,
} from "./task.controller.js";

const router = Router();

router.post("/:id/tasks", authenticate, createTaskController);
router.get("/:id/tasks", authenticate, getProjectTasksController);
router.get("/:id/tasks/:taskId", authenticate, getTaskByIdController);
router.patch("/:id/tasks/:taskId", authenticate, updateTaskController);
router.delete("/:id/tasks/:taskId", authenticate, deleteTaskController);

export default router;
