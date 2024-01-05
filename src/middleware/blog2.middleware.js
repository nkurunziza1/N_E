import upload from "../config/multer.js";

export const uploadArray2 = (name) => async (req, res, next) => {
  try {
    upload.array(name)(req, res, (err) => {

      if (err) {
        console.log(err)
        // Pass the error to the next middleware/handler
        return next(err);
      }
      // Continue to the next middleware/handler
      next();
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error in uploadArray middleware:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};
