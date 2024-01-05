import { uploadfile, uploadArray } from "../middleware/blog.middleware.js";
import { uploadArray2 } from "../middleware/blog2.middleware.js";
import { apply, getApplications, getSingleApplication } from "../controller/careers.controllers.js";
import { Router } from "express";
import extractToken from "../middleware/checkUserWithToken.js";
const router = Router();

router.post(
  "/application",
  uploadArray([
    { name: "cv", maxCount: 1 },
    { name: "nationalId", maxCount: 1 },
    { name: "certificate", maxCount: 8 },
  ]),
  apply
);

router.get("/application", extractToken, getApplications);
router.get("/application/:id", extractToken, getSingleApplication);
export default router;
