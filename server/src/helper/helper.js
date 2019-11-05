import bcrypt from 'bcrypt';

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
}
