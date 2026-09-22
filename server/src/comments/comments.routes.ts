import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createCommentsController, getTaskCommentsController, updateCommentsController } from "./comments.controller.js";

const router = Router();

router.post("/:taskId/comments", authenticate, createCommentsController);
router.get("/:taskId/comments", authenticate, getTaskCommentsController);
router.patch("/:taskId/comments/:commentId", authenticate, updateCommentsController);

export default router;