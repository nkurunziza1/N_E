import {
    createTestmonials,
    deleteSingleTesmonial,
  } from "../controller/testmonials.controllers.js";
  import { Router } from "express";
  import extractToken from "../middleware/checkUserWithToken.js";
  import { uploadfile } from "../middleware/blog.middleware.js";
  import { getAllTestmonial } from "../controller/testmonials.controllers.js";
  
  const router = Router();
  
  router.post("/testmonial", extractToken, uploadfile("image"), createTestmonials);
  router.get("/testmonial", getAllTestmonial)
  router.delete("/testmonial/:id", extractToken, deleteSingleTesmonial);
  
  
  export default router;
  