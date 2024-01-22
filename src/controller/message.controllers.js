import Message from "../models/Message.js";
import { sendBlogEmail } from "../services/nodeMailer.service.js";
import { composeEmail } from "../utils/blog.js";

export const messageConsult = async (req, res) => {
  try {
    const { name, email, telephone, description } = req.body;
    const message = await Message.create({
      name,
      email,
      telephone,
      description,
    });

    await message.save();
    const html = composeEmail(name, description)
    sendBlogEmail(html, process.env.SENDING_EMAIL, "message from website")
    return res.status(200).json({
      message,
      message: "Thank you for contact us !",
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};
