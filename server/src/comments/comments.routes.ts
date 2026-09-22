import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createCommentController } from "./comments.controller.js";

const router = Router();

router.post("/:taskId/comments", authenticate, createCommentController);

export default router;