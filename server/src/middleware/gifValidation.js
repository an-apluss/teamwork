import Joi from '@hapi/joi';
import Gif from '../models/gif';

/**
 *
 *
 * @export
 * @class GifValidation
 */
export default class GifValidation {
  /**
   *
   * Handles the logic that check if user gif post is valid
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object|Function}
   * @memberof GifValidation
   */
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

  /**
   *
   * Handles the logic to check if user is the owner of a gif post
   * @static
   * @param {Object} req
   * @param {Object} res
   * @param {*} next
   * @returns {Object|Function}
   * @memberof GifValidation
   */
  static async checkGifOwner(req, res, next) {
    const gif = await Gif.findOne('id', req.params.gifId);
    const { userId, isAdmin } = req.user;

    if (gif.userid !== userId && !isAdmin) {
      return res.status(401).json({
        status: 'error',
        message: 'You cannot perform this action. Post does not belong to you'
      });
    }

    return next();
  }
}
