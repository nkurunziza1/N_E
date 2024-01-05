import newsLetter from "../models/NewsLetter.js";


export const subscribe = async (req, res) => {
  const { email } = req.body;
  try {
    const isSubscribed = await newsLetter.findOne({ email });
    if (isSubscribed) {

    }
    const subscribe = await newsLetter.create({
      email,
    });
    await subscribe.save();
    res
      .status(200)
      .json({
        message:
          "Thank you for your subscription. you'll always be alerted to the new activity",
      });

  } catch (error) {
    throw new Error(error);
  }
};
