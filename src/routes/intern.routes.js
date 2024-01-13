import { Router } from "express";
import {
  getInternApplications,
  getSingleApplicationIntern,
  internApply,
} from "../controller/intern.controller.js";

import extractToken from "../middleware/checkUserWithToken.js";
import { uploadArray } from "../middleware/blog.middleware.js";
const router = Router();

router.post(
  "/intern",
  uploadArray([
    { name: "cv", maxCount: 1 },
    { name: "certificate", maxCount: 8 },
  ]),
  internApply
);
router.get("/intern/:id", extractToken, getSingleApplicationIntern);
router.get("/intern", extractToken, getInternApplications);

export default router;
