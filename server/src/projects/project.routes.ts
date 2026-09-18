import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createProjectController } from "./project.controller.js";

const router = Router();

router.post("/", authenticate, createProjectController);

export default router;