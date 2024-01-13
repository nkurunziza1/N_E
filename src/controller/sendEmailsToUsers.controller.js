// Your route file
import Company from "../models/Company.js";
import Careers from "../models/Careers.js";
import Intern from "../models/Intern.js";
import { sendEmailToUser } from "../utils/blog.js";
import { sendBlogEmail } from "../services/nodeMailer.service.js";
import User from "../models/users.js";

export const sendEmailsToAllUsers = async (req, res) => {
  const { description } = req.body;
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user.role !== "superAdmin") {
    return res.status(401).json({ message: "only superAdmin can view" });
  }
  try {
    const companies = await Company.find({}, "email name");
    const careers = await Careers.find({}, "email firstname");
    const interns = await Intern.find({}, "email firstname");

    const companyEmails = companies.map((company) => ({
      email: company.email,
      name: company.name,
    }));
    const careersEmails = careers.map((consult) => ({
      email: consult.email,
      name: consult.firstname,
    }));
    const internEmails = interns.map((intern) => ({
      email: intern.email,
      name: intern.firstname,
    }));

    if (
      !(companyEmails.length || careersEmails.length || internEmails.length)
    ) {
      return res.status(400).json({ error: "No emails found" });
    }

    const emailsWithData = [
      ...companyEmails,
      ...careersEmails,
      ...internEmails,
    ];

    for (const userData of emailsWithData) {
      const { email, name } = userData;
      const html = sendEmailToUser(name, description);
      await sendBlogEmail(html, email, "stylos consults");
    }

    return res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendEmailToIndividual = async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user.role !== "superAdmin") {
    return res.status(401).json({ message: "only superAdmin can view" });
  }

  const { id } = req.params;
  const { description } = req.body;
  const userEmails =
    (await Careers.findById({ _id: id })) ||
    Company.findById({ _id: id }) ||
    Intern.findById({ _id: id });
  try {
    if (!userEmails) {
      return res.status(404).json({ error: "User not found" });
    }

    const html = sendEmailToUser(
      userEmails.name || userEmails.firstname,
      description
    );
      await sendBlogEmail(html, [userEmails.email], "stylos consults");

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
