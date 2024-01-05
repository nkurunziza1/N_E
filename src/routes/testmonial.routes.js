import {
    createTestmonials,
    deleteSingleTesmonial,
  } from "../controller/testmonials.controllers.js";
  import { Router } from "express";
  import extractToken from "../middleware/checkUserWithToken.js";
  import { uploadfile } from "../middleware/blog.middleware.js";
  
  
  const router = Router();
  
  router.post("/testmonial", extractToken, uploadfile("image"), createTestmonials);
  router.delete("/testmonial/:id", extractToken, deleteSingleTesmonial);
  
  export default router;
  