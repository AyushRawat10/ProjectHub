import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { addMemberController, getAllProjectMembersController, removeMemberController } from "./project-member.controller.js";

const router = Router()

router.post("/:id/members", authenticate, addMemberController);
router.get("/:id/members", authenticate, getAllProjectMembersController);
router.delete("/:id/members/:userId", authenticate, removeMemberController);

export default router;