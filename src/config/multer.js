import multer from "multer";
import path from "path";

import storage from "./cloudinary.js";

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (
    ext !== ".png" &&
    ext !== ".jpg" &&
    ext !== ".gif" &&
    ext !== ".jpeg" &&
    ext !== ".pdf"
  ) {
    return cb(new Error("Only images are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter,
});

export default upload;
