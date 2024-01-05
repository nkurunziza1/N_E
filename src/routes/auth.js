import express from "express";
import { signin, logout } from "../controller/auth.js";
import {signupValidation,signInValidation} from "../validation/user.validation.js";


const router = express.Router();
router.post("/login",signInValidation, signin);
router.get("/logout", logout);

export default router;
