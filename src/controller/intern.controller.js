import Intern from "../models/Intern.js";
import User from "../models/users.js";

export const internApply = async (req, res) => {
  try {
    const {
      firstname,
      secondname,
      email,
      telephone,
      location,
      address,
      gender,
      industry,
      workPreference,
    } = req.body;
    const applicationExists = await Intern.findOne({email});


    if (applicationExists) {
      return res
        .status(400)
        .json({ message: "Application with this email already exists" });
    }

    const cv = req.files.cv[0].path;
    const certificate = req.files.certificate;

    const application = await Intern.create({
      firstname,
      secondname,
      email,
      telephone,
      location,
      address,
      gender,
      industry,
      workPreference,
      cv,
      certificate,
    });

    await application.save();

    return res.status(200).json({
      application,
      message: "Application created successfully! Thank you for your application you'll be contacted soon.",
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};


export const getSingleApplicationIntern = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res
        .status(401)
        .json({ message: "only superAdmin can create a Blog" });
    }
    const { id } = req.params;
    const application = await Intern.findById({ _id: id });
    if (!application) {
      return res.json({ message: "Application not  found!" });
    }
    return res.status(200).json({ message: application });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getInternApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.role !== "superAdmin") {
      return res
        .status(401)
        .json({ message: "only superAdmin can create a Blog" });
    }
    const allApplication = await Intern.find({});
    return res.status(200).json(allApplication);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
