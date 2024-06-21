import { Router } from "express";
import extractToken from "../middleware/checkUserWithToken.js";
import { assignRoleToUser, deleteSingleSingleUser, getAllUser } from "../controller/users.controller.js";

const router = Router();
router.get("/", extractToken, getAllUser);
router.delete("/:id", extractToken, deleteSingleSingleUser);
router.post("/assign/:id", extractToken, assignRoleToUser)

export default router;
