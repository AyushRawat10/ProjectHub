import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createTaskController,  } from "./task.controller.js";

const router = Router();

router.post("/:id/tasks", authenticate, createTaskController);

export default router;
