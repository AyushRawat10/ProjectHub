import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
	createCommentsController,
	deleteCommentsController,
	getTaskCommentsController,
	updateCommentsController,
} from "./comments.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createCommentSchema, updateCommentSchema } from "./comments.schemas.js";

const router = Router();

router.post("/:taskId/comments", authenticate, validate(createCommentSchema), createCommentsController);
router.get("/:taskId/comments", authenticate, getTaskCommentsController);
router.patch(
	"/:taskId/comments/:commentId",
	authenticate,
	validate(updateCommentSchema),
	updateCommentsController
);
router.delete(
	"/:taskId/comments/:commentId",
	authenticate,
	deleteCommentsController
);

export default router;
