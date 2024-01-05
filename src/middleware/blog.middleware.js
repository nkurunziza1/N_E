import upload from "../config/multer.js";

export const uploadArray = (name) => async (req, res, next) => {
  try {
    upload.fields(name)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          message: "Something went wrong while trying to upload Image",
          error: err.message,
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Image upload error" });
  }
};

export const uploadfile = (name ) => async (req, res, next) => {
  try {
    upload.single(name)(req, res, (err) => {
      console.log(req.body);
      console.log(req.file);
      if (err) {
        console.log(err)
        return res.status(400).json({
          status: 400,
          message: "Something went wrong while trying to upload Image",
          error: err.message,
        });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Image upload error" });
  }
};


