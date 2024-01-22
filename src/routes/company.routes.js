import { Router } from "express";
import {
  companyApply,
  deleteCompanies,
  deleteSinglecompany,
  getCompanyApplications,
  getSingleCompanyApplication,
} from "../controller/company.controller.js";
import extractToken from "../middleware/checkUserWithToken.js";
const router = Router();

router.post("/company", companyApply);
router.get("/company",extractToken, getCompanyApplications);
router.get("/company/:id", extractToken, getSingleCompanyApplication);
router.delete("/company/:id", deleteSinglecompany);
router.delete("/company", deleteCompanies);


export default router;
