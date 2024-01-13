import { Router } from "express";
import { messageConsult } from "../controller/message.controllers.js";


const router = Router();
router.post("/message", messageConsult);

export default router;
