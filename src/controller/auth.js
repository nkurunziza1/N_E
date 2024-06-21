import bcrypt from "bcryptjs";
import { generateToken } from "../utils/Tokens.js";
import User from "../models/users.js";


export const signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "Email already exists" });
    }
    const { fullname, email, password, telephone, location } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      telephone,
      location,
    });

    await newUser.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
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
