import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { createProjectController, deleteProjectController, getMyAllProjectController, getProjectById, updateProjectController } from "./project.controller.js";
import { addMemberController } from "./project-member.controller.js";

const router = Router();

// Project functionality routing ...
router.post("/", authenticate, createProjectController);
router.get("/", authenticate, getMyAllProjectController);
router.get("/:id", authenticate, getProjectById);
router.patch("/:id", authenticate, updateProjectController);
router.delete("/:id", authenticate, deleteProjectController);

// Members functionality routing ...
router.post("/:id/members", authenticate, addMemberController);

export default router;