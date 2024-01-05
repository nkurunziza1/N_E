import bcrypt from "bcryptjs";
import { generateToken } from "../utils/Tokens.js";
import User from "../models/users.js";



export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("user", user);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      await res.status(404).send({ message: "Invalid credentials !" });
    }
    const UserToken = {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      expired: user.expired,
    };
    const token = generateToken(UserToken);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user: user, token: token });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).send({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
