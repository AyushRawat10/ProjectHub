import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createTaskController, getProjectTasksController,  } from "./task.controller.js";

const router = Router();

router.post("/:id/tasks", authenticate, createTaskController);
router.get("/:id/tasks", authenticate, getProjectTasksController);

export default router;
