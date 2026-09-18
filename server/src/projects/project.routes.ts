import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createProjectController, getMyAllProjectController, getProjectById } from "./project.controller.js";

const router = Router();

router.post("/", authenticate, createProjectController);
router.get("/", authenticate, getMyAllProjectController);
router.get("/:id", authenticate, getProjectById);

export default router;