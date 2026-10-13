import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { getAvailableUsersController } from "./user.controller.js";

const router = Router();

router.get(
  "/",
  authenticate,
  asyncHandler(getAvailableUsersController)
);

export default router;