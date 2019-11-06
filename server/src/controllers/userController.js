import userService from '../services/userService';

/**
 *
 *
 * @export
 * @class UserController
 */
export default class UserController {
  /**
   *
   * Handles user's login response
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {*} next
   * @returns {Object}
   * @memberof UserController
   */
  static async signin(req, res, next) {
    try {
      const { code, status, result } = await userService.login(req.body);

      if (status === 'success') return res.status(code).send({ status, data: result });

      return res.status(code).send({ status, message: result });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * Handles user(employee) sign up response
   * @static
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {*} next
   * @returns {Object}
   * @memberof UserController
   */
  static async createUser(req, res, next) {
    try {
      const { code, status, result } = await userService.create(req.body);

      return res.status(code).send({ status, data: result });
    } catch (error) {
      next(error);
    }
  }
}
