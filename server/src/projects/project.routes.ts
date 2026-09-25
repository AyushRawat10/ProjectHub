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
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/", authenticate, validate(createProjectSchema), asyncHandler(createProjectController));
router.get("/", authenticate, asyncHandler(getMyAllProjectController));
router.get("/:id", authenticate, asyncHandler(getProjectById));
router.patch("/:id", authenticate, validate(updateProjectSchema), asyncHandler(updateProjectController));
router.delete("/:id", authenticate, asyncHandler(deleteProjectController));

export default router;