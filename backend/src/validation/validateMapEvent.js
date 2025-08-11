import Joi from 'joi';

export const mapEventSchema = Joi.object({
  x: Joi.number().min(0).max(100).required(),
  y: Joi.number().min(0).max(100).required(),
  category: Joi.string().required(),
  title: Joi.string().trim().required(),
  zIndex: Joi.number().min(1).max(10).default(1),
});

export function validateMapEvent(req, res, next) {
  const { error } = mapEventSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}
