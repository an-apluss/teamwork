import database from './db';

/**
 *
 *
 * @export
 * @class User
 */
export default class User {
  /**
   *
   * Handles the logic to fetch a users by an attribute
   * @static
   * @param {String} field this is attribute to be queried in the users table
   * @param {Number|String} value this is the value of the attribute
   * @returns {Object|Boolean} return object if success or boolen if fail
   * @memberof User
   */
  static async findOne(field, value) {
    const sqlQuery = `SELECT * FROM users WHERE ${field} = $1`;
    const { rows, rowCount } = await database.query(sqlQuery, [value]);

    if (rowCount > 0) return rows[0];

    return false;
  }
}
