import User from '../models/user';
import Helper from '../helper/helper';

const { comparePassword, generateToken, hashPassword } = Helper;

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

  /**
   *
   * Handles the logic to create a new user
   * @static
   * @param {Object} data data of the new user to be created
   * @returns {Object}
   * @memberof UserService
   */
  static async create(data) {
    const { firstName, lastName, email, password, gender, jobRole, department, address } = data;
    const hashedPassword = await hashPassword(password);

    const user = await User.save(
      firstName,
      lastName,
      email,
      hashedPassword,
      gender,
      jobRole,
      department,
      address
    );

    return {
      code: 201,
      status: 'success',
      result: {
        message: 'User account successfully created',
        token: generateToken(user),
        userId: user.id
      }
    };
  }
}
