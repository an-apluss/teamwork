import User from '../models/user';

/**
 *
 *
 * @export
 * @class UserService
 */
export default class UserService {
  /**
   *
   * Handles the logic to login user
   * @static
   * @param {Objeect} credential these are the data to login user
   * @returns {Object}
   * @memberof UserService
   */
  static async login(credential) {
    const { email, password } = credential;
    const user = await User.findOne('email', email);

    if (!user || password !== user.password) {
      return {
        code: 401,
        status: 'error',
        result: 'Provided login credential is incorrect. Check email or password'
      };
    }

    return {
      code: 200,
      status: 'success',
      result: {
        token: 'token',
        userId: user.id
      }
    };
  }
}
