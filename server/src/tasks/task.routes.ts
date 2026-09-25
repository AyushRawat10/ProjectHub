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
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post(
	"/:id/tasks",
	authenticate,
	validate(createTaskSchema),
	asyncHandler(createTaskController)
);
router.get("/:id/tasks", authenticate, asyncHandler(getProjectTasksController));
router.get(
	"/:id/tasks/:taskId",
	authenticate,
	asyncHandler(getTaskByIdController)
);
router.patch(
	"/:id/tasks/:taskId",
	authenticate,
	validate(updateTaskSchema),
	asyncHandler(updateTaskController)
);
router.delete(
	"/:id/tasks/:taskId",
	authenticate,
	asyncHandler(deleteTaskController)
);

export default router;
