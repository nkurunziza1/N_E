import User from "../models/users.js";

export const getAllUser = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user.role !== "admin") {
    return res.status(401).json({ message: "only admin can view  a Users" });
  }
  try {
    const allUser = await User.find({});
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const assignRoleToUser = async (req, res) => {
  const adminId = req.user.id;
  const { id } = req.params;
  const { role } = req.body;
  try {
    const admin = await User.findById(adminId);

    if (admin.role !== "admin") {
      return res
        .status(401)
        .json({ message: "Only admin can change user roles" });
    }
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    return res
      .status(200)
      .json({ message: "Role assigned successfully", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSingleSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "only admin can delete a User" });
    }
    const testmonialToDelete = await Testmonials.findByIdAndDelete({ _id: id });
    if (!testmonialToDelete) {
      return res.status(200).json({
        message: "User  has already been deleted",
      });
    }
    return res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ massage: error });
  }
};
