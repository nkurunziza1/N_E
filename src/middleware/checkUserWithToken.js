import { verifyToken } from "../utils/Tokens.js";
import User from "../models/users.js";

const extractToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).json({ status: 401, message: "Please sign in" });
    }
    const token = req.header("Authorization").split(" ")[1];

    const details = verifyToken(token);
    const userExists = await User.findOne({ email: details.data.email });
    if (!userExists) {
      return res.status(401).json({
        status: 401,
        message: "Your session has expired, please login!",
      });
    }
    req.user = userExists;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "No valid credentials" });
  }
};
export default extractToken;
