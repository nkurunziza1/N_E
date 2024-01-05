import Joi from "joi";
const otpValidity = Joi.object({
    otp: Joi.string().max(6).required(),
  });
  
  export const otpValidation = async (req, res, next) => {
    const { error } = otpValidity.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        error: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
      });
    } 
    else {
      next();
    }
  };