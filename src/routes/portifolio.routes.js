import {
    createPortifolios,
    getSinglePortifolio,
    getAllPortifolio,
    updateSinglePortifolio,
    deleteSinglePortifolio,
  } from "../controller/portifolio.controllers.js";
  import { uploadArray } from "../middleware/blog.middleware.js";
  import { Router } from "express";
  import { uploadArray2 } from "../middleware/blog2.middleware.js";
  import extractToken from "../middleware/checkUserWithToken.js";
  import { uploadfile } from "../middleware/blog.middleware.js";
  
  const router = Router();
  router.post("/portifolio", extractToken, uploadfile("image"), createPortifolios);
  router.get("/portifolio/:id", getSinglePortifolio);
  router.get("/portifolio", getAllPortifolio);
  router.patch(
    "/portifolio/:id",
    extractToken,
    uploadfile("image"),
    updateSinglePortifolio
  );
  router.delete("/portifolio/:id", extractToken, deleteSinglePortifolio);
  
  // router.post("/rooms/pdf", upload.single("file"), uploadPdf);
  // router.get("/rooms/pdf", getPdf);
  export default router;
  