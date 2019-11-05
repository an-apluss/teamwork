import User from '../models/user';
import Helper from '../helper/helper';

const { comparePassword, generateToken } = Helper;

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
    const isSamePassword = await comparePassword(password, user.password);

    if (!user || !isSamePassword) {
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
        token: generateToken(user),
        userId: user.id
      }
    };
  }
}
