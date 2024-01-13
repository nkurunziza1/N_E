import { Router } from "express";
import extractToken from "../middleware/checkUserWithToken.js";
import {sendEmailToIndividual} from "../controller/sendEmailsToUsers.controller.js";
import {sendEmailsToAllUsers }from "../controller/sendEmailsToUsers.controller.js";

const router = Router();
router.post("/emails/:id", extractToken, sendEmailToIndividual);
router.post("/emails", extractToken, sendEmailsToAllUsers);

export default router;
