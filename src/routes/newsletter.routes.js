import { Router } from "express";
import { subscribe } from "../controller/newsletter.controllers.js";
import emailInput from "../validation/review.validation.js";
import { getSubscribedUser } from "../controller/newsletter.controllers.js";
import extractToken from "../middleware/checkUserWithToken.js";
const router = Router();

router.post("/newsletter", emailInput, subscribe);
router.get("/newsletter", extractToken, getSubscribedUser);
export default router;
