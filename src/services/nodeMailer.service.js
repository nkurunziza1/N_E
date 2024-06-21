import nodeMailer from "nodemailer";

export async function sendScheduleEmail(HTML, user, subject, text) {
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDING_EMAIL,
      pass: process.env.SENDING_EMAIL_PASSWORD,
    },
  });

  try {
    const info = await transport.sendMail({
      from: process.env.SENDING_EMAIL,
      to: user,
      subject: subject,
      text: text,
      html: HTML,
    });
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  } finally {
    transport.close();
  }
}
