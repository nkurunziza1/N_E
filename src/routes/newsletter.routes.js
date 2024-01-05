import { Router } from "express";
import  {subscribe } from "../controller/newsletter.controllers.js";
import emailInput from "../validation/review.validation.js";

const router = Router();

router.post("/newsletter",emailInput, subscribe)

export default router