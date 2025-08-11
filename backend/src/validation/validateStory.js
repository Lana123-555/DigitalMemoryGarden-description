import Joi from 'joi';
import mongoose from 'mongoose';

export const storySchema = Joi.object({
  storyId: Joi.string().required(),
  title: Joi.when('source', {
    is: 'flower',
    then: Joi.string().min(3).max(100).required(),
    otherwise: Joi.string().max(100).allow('', null),
  }),
  comment: Joi.string().max(2000).allow('', null),
  name: Joi.string().max(100).allow('', null),

  // Fields for flowers, archives and gallery
  age: Joi.when('source', {
    is: Joi.valid('flower', 'archive', 'gallery'),
    then: Joi.number().integer().min(0).max(120).allow(null, ''),
    otherwise: Joi.forbidden(),
  }),
  location: Joi.when('source', {
    is: Joi.valid('flower', 'archive', 'gallery'),
    then: Joi.string().max(200).allow('', null),
    otherwise: Joi.forbidden(),
  }),

  // Fields for candles only - now required
  dateOfBirth: Joi.when('source', {
    is: 'candle',
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  dateOfDeath: Joi.when('source', {
    is: 'candle',
    then: Joi.date().required(),
    otherwise: Joi.forbidden(),
  }),
  candleType: Joi.when('source', {
    is: 'candle',
    then: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }),
    otherwise: Joi.forbidden(),
  }),

  category: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
  source: Joi.string()
    .valid('flower', 'candle', 'archive', 'gallery')
    .required(),
});
