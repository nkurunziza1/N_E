import {
  createBlogs,
  getSingleBlog,
  getAllBlog,
  updateSingleBlog,
  deleteSingleBlog,
} from "../controller/blogs.controllers.js";
import { uploadArray } from "../middleware/blog.middleware.js";
import { Router } from "express";
import { uploadArray2 } from "../middleware/blog2.middleware.js";
import extractToken from "../middleware/checkUserWithToken.js";
import { uploadfile } from "../middleware/blog.middleware.js";
// import {getPdf, uploadPdf} from "../controller/upload.js"
// import multer  from "multer";
// import upload from "../config/multer.js";


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './files')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() 
//       cb(null,uniqueSuffix+file.originalname)
//     }
//   })

  
// const upload = multer({ storage: storage })

const router = Router();

router.post("/blog", extractToken, uploadfile("image"), createBlogs);
router.get("/blogs/:id", getSingleBlog);
router.get("/blogs", getAllBlog);
router.patch(
  "/blogs/:id",
  extractToken,
  uploadfile("image"),
  updateSingleBlog
);
router.delete("/blogs/:id", extractToken, deleteSingleBlog);

// router.post("/rooms/pdf", upload.single("file"), uploadPdf);
// router.get("/rooms/pdf", getPdf);
export default router;
