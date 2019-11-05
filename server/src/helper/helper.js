import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

/**
 *
 *
 * @export
 * @class Helper
 */
export default class Helper {
  /**
   *
   * Handles the logic to compare plaintext and hashed password if the same
   * @static
   * @param {String} plaintextPasssword plaintext password
   * @param {String} hashedPasssword hashed password
   * @returns {Boolean} return true if successful or false if unsuccessful
   * @memberof Helper
   */
  static async comparePassword(plaintextPasssword, hashedPasssword) {
    const comparePassword = await bcrypt.compare(plaintextPasssword, hashedPasssword);
    return comparePassword;
  }

  /**
   *
   * Handles the logic to generate user token
   * @static
   * @param {Object} userData user data to be encrypted
   * @returns {String} encrypted user data
   * @memberof Helper
   */
  static generateToken(userData) {
    const { id, firstname, lastname, jobrole, isadmin, department } = userData;
    const token = jwt.sign(
      {
        userId: id,
        firstName: firstname,
        lastName: lastname,
        jobRole: jobrole,
        isAdmin: isadmin,
        department
      },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '24h' }
    );

    return token;
  }
}
