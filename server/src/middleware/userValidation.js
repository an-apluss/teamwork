import Joi from '@hapi/joi';
import User from '../models/user';

/**
 *
 *
 * @export
 * @class UserValidation
 */
export default class UserValidation {
  /**
   *
   * Handles the logic to validate user login credential
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {*} next
   * @returns
   * @memberof UserValidation
   */
  static async signinCheck(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(6)
        .required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const user = await User.findOne('email', req.body.email);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Provided login credential is incorrect. Check email or password'
      });
    }

    return next();
  }

  /**
   *
   * Handles the logic to validate user's signup data
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {*} next
   * @returns {Object|Function}
   * @memberof UserValidation
   */
  static async signupCheck(req, res, next) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
      password: Joi.string()
        .min(6)
        .required(),
      gender: Joi.string().required(),
      jobRole: Joi.string().required(),
      department: Joi.string().required(),
      address: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({
        status: 'error',
        message: error.details[0].message
      });
    }

    const user = await User.findOne('email', req.body.email);

    if (user) {
      return res.status(401).json({
        status: 'error',
        message: 'Email is already taken'
      });
    }

    return next();
  }
}
