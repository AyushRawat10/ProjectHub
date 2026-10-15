import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
	addMemberController,
	getAllProjectMembersController,
	removeMemberController,
	updateMemberRoleController,
} from "./project-member.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { addProjectMemberSchema } from "./project-member.schemas.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.post(
	"/:id/members",
	authenticate,
	validate(addProjectMemberSchema),
	asyncHandler(addMemberController)
);
router.get(
	"/:id/members",
	authenticate,
	asyncHandler(getAllProjectMembersController)
);
router.delete(
	"/:id/members/:userId",
	authenticate,
	asyncHandler(removeMemberController)
);
router.patch(
	"/:id/members/:userId/role",
	authenticate,
	asyncHandler(updateMemberRoleController)
);

export default router;
