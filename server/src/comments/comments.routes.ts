import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
	createCommentsController,
	deleteCommentsController,
	getTaskCommentsController,
	updateCommentsController,
} from "./comments.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import {
	createCommentSchema,
	updateCommentSchema,
} from "./comments.schemas.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post(
	"/:taskId/comments",
	authenticate,
	validate(createCommentSchema),
	asyncHandler(createCommentsController)
);
router.get("/:taskId/comments", authenticate, asyncHandler(getTaskCommentsController));
router.patch(
	"/:taskId/comments/:commentId",
	authenticate,
	validate(updateCommentSchema),
	asyncHandler(updateCommentsController)
);
router.delete(
	"/:taskId/comments/:commentId",
	authenticate,
	asyncHandler(deleteCommentsController)
);

export default router;
