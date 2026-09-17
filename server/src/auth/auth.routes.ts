import { Router } from "express";
import {
	registerController,
	verifyEmailController,
	loginController,
	getMeController,
	refreshAccessTokenController,
	resendVerificationController,
} from "./auth.controller.js";
import { authenticate } from "./auth.middleware.js";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshAccessTokenController);
router.post("/verify-email", verifyEmailController);
router.post("/resend-verification", resendVerificationController);

// Protected routes ...
router.get("/me", authenticate, getMeController);

export default router;
