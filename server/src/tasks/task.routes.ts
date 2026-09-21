import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createTaskController, getProjectTasksController, getTaskByIdController,  } from "./task.controller.js";

const router = Router();

router.post("/:id/tasks", authenticate, createTaskController);
router.get("/:id/tasks", authenticate, getProjectTasksController);
router.get("/:id/tasks/:taskId", authenticate, getTaskByIdController);

export default router;
