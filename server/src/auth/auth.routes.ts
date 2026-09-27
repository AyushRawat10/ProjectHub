import { Router } from "express";
import rateLimit from "express-rate-limit";
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
import { loginSchema, registerSchema, resendVerificationSchema, verifyEmailSchema } from "./auth.schemas.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 10,
	message: {
		message: "Too many login attempts. Please try again later."
	},
	standardHeaders: true,
	legacyHeaders: false
})

const verifyEmailLimiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 10,
	message: {
		message: "Too many verification attempts. Please try again later."
	},
	standardHeaders: true,
	legacyHeaders: false
})

const resendVerificationLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 3,
	message: {
		message: "Too many verification email requests. Please try again later."
	},
	standardHeaders: true,
	legacyHeaders: false
})

const registerLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5,
	message: {
		message: "Too many registration attempts. Please try again later."
	},
	standardHeaders: true,
	legacyHeaders: false
})

const refreshLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: {
        message: "Too many refresh attempts. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/register", registerLimiter, validate(registerSchema), asyncHandler(registerController));
router.post("/login", loginLimiter, validate(loginSchema), asyncHandler(loginController));
router.post("/refresh", refreshLimiter, asyncHandler(refreshAccessTokenController));
router.post("/verify-email", verifyEmailLimiter, validate(verifyEmailSchema), asyncHandler(verifyEmailController));
router.post("/resend-verification", resendVerificationLimiter, validate(resendVerificationSchema), asyncHandler(resendVerificationController));
router.post("/logout", asyncHandler(logoutController));

// Protected routes ...
router.get("/me", authenticate, asyncHandler(getMeController));

export default router;
