import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
	createTaskController,
	deleteTaskController,
	getProjectTasksController,
	getTaskByIdController,
	updateTaskController,
} from "./task.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "./task.schemas.js";

const router = Router();

router.post("/:id/tasks", authenticate, validate(createTaskSchema), createTaskController);
router.get("/:id/tasks", authenticate, getProjectTasksController);
router.get("/:id/tasks/:taskId", authenticate, getTaskByIdController);
router.patch("/:id/tasks/:taskId", authenticate, validate(updateTaskSchema), updateTaskController);
router.delete("/:id/tasks/:taskId", authenticate, deleteTaskController);

export default router;
