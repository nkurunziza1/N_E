import Joi from "joi";

const emailSchema = Joi.object({ 
    email:Joi.string().allow('').required(),
  });

  const emailInput = (req, res, next) => {
    const { error } = emailSchema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  
    next();
  };

  export default emailInput;
