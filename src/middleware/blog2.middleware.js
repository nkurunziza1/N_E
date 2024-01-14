import upload from "../config/multer.js";

export const uploadArray2 = (name) => async (req, res, next) => {
  try {
    upload.array(name)(req, res, (err) => {

      if (err) {

        return next(err);
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
