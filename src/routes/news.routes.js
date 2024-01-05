import {
  createNews,
  getSingleNews,
  getAllNews,
  updateSingleNews,
  deleteSingleNews,
} from "../controller/news.controllers.js";
import { Router } from "express";
import extractToken from "../middleware/checkUserWithToken.js";
import { uploadfile } from "../middleware/blog.middleware.js";


const router = Router();

router.post("/news", extractToken, uploadfile("image"), createNews);
router.get("/news/:id", getSingleNews);
router.get("/news", getAllNews);
router.patch("/news/:id", extractToken, uploadfile("image"), updateSingleNews);
router.delete("/news/:id", extractToken, deleteSingleNews);

export default router;
