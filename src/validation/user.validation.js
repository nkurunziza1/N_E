import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

const validateForm = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signUpSchema = Joi.object({
  fullname: Joi.string().min(1).trim().required(),
  telephone: Joi.string().min(1).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().required()
});

const validatesignUp = validateForm(signUpSchema);

export const signupValidation = (req, res, next) => {
  const { error } = validatesignUp(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};

const signInSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const validatesignIn = validateForm(signInSchema);
export const signInValidation = (req, res, next) => {
  const { error } = validatesignIn(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map((detail) =>
        detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
      ),
    });
  } else {
    next();
  }
};
