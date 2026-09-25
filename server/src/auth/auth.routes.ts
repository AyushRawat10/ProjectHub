import { Router } from "express";
import {
	registerController,
	verifyEmailController,
	loginController,
	getMeController,
	refreshAccessTokenController,
	resendVerificationController,
    logoutController,
} from "./auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema, verifyEmailSchema } from "./auth.schemas.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(registerController));
router.post("/login", validate(loginSchema), asyncHandler(loginController));
router.post("/refresh", asyncHandler(refreshAccessTokenController));
router.post("/verify-email", validate(verifyEmailSchema), asyncHandler(verifyEmailController));
router.post("/resend-verification", asyncHandler(resendVerificationController));
router.post("/logout", asyncHandler(logoutController));

// Protected routes ...
router.get("/me", authenticate, asyncHandler(getMeController));

export default router;
