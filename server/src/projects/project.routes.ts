import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import {
	createProjectController,
	deleteProjectController,
	getMyAllProjectController,
	getProjectById,
	updateProjectController,
} from "./project.controller.js";

const router = Router();

router.post("/", authenticate, createProjectController);
router.get("/", authenticate, getMyAllProjectController);
router.get("/:id", authenticate, getProjectById);
router.patch("/:id", authenticate, updateProjectController);
router.delete("/:id", authenticate, deleteProjectController);

export default router;
