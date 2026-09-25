import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
	createProjectController,
	deleteProjectController,
	getMyAllProjectController,
	getProjectById,
	updateProjectController,
} from "./project.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createProjectSchema, updateProjectSchema } from "./project.schemas.js";

const router = Router();

router.post("/", authenticate, validate(createProjectSchema), createProjectController);
router.get("/", authenticate, getMyAllProjectController);
router.get("/:id", authenticate, getProjectById);
router.patch("/:id", authenticate, validate(updateProjectSchema), updateProjectController);
router.delete("/:id", authenticate, deleteProjectController);

export default router;