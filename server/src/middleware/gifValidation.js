import Joi from '@hapi/joi';

export default class GifValidation {
  static checkGifPost(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    if (!req.file) {
      return res.status(422).json({
        status: 'error',
        message: 'Image is required'
      });
    }

    return next();
  }
}
