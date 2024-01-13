
import { Router } from "express";
import {
    companyApply,
    getCompanyApplications,
    getSingleCompanyApplication,
  } from "../controller/company.controller.js";
import extractToken from "../middleware/checkUserWithToken.js";
const router = Router()

router.post("/company", companyApply);
router.get("/company/:id", extractToken, getSingleCompanyApplication);
router.get("/company", extractToken, getCompanyApplications);


export default router