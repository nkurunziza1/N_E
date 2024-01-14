import Company from "../models/Company.js";
import User from "../models/users.js";

export const companyApply = async (req, res) => {
  try {
    const { name, email, telephone, location, address, website } = req.body;

    const applicationExists = await Company.findOne({ name });

    if (applicationExists) {
      return res.status(400).json({ message: "company with this name exit" });
    }
    const application = await Company.create({
      name,
      email,
      telephone,
      location,
      address,
      website,
    });

    await application.save();

    return res.status(200).json({
      application,
      message: " Company Register successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

export const getSingleCompanyApplication = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res.status(401).json({ message: "only superAdmin can view" });
    }
    const { id } = req.params;
    const application = await Company.findById({ _id: id });
    if (!application) {
      return res.json({ message: "Company not  found!" });
    }
    return res.status(200).json({ message: application });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getCompanyApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res.status(401).json({ message: "only superAdmin can view" });
    }
    const allApplication = await Company.find({});
    return res.status(200).json(allApplication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


