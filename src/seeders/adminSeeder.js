import User from "../models/users.js";
import { BcryptUtil } from "../utils/bcrypt.js";
import { generateToken } from "../utils/Tokens.js";

const adminSeeder = async () => {
  try {
    const adminUser = await User.findOne({ fullname: "super admin" });
    if (adminUser) {
      return;
    }

    const adminUserData = {
      fullname: "admin",
      email: "admin@waste.com",
      role: "admin",
      telephone: process.env.TELEPHONE,
      isEmailVerified: true,
    };

    const hashedPassword = await BcryptUtil.hash(process.env.ADMIN_PWD);

    adminUserData.password = hashedPassword;
    const ExitUser = await User.find({ email: adminUserData.email });
    if (ExitUser) return;
    const createdAdminUser = await User.create(adminUserData);

    const token = generateToken(createdAdminUser);

    console.log("Admin user seeded successfully");
    console.log("Admin user token:", token);
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};
export default adminSeeder;
