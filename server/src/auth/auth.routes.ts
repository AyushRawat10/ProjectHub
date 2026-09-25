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

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.post("/refresh", refreshAccessTokenController);
router.post("/verify-email", validate(verifyEmailSchema), verifyEmailController);
router.post("/resend-verification", resendVerificationController);
router.post("/logout", logoutController);

// Protected routes ...
router.get("/me", authenticate, getMeController);

export default router;
