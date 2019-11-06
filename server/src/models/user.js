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

  /**
   *
   * Handles the logic to insert user in the users table
   * @static
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} email
   * @param {String} password
   * @param {String} gender
   * @param {String} jobRole
   * @param {String} department
   * @param {String} address
   * @returns {Object} return inserted data
   * @memberof User
   */
  static async save(firstName, lastName, email, password, gender, jobRole, department, address) {
    const sqlQuery = `INSERT INTO users(firstname, lastname, email, password, gender, jobrole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    const values = [firstName, lastName, email, password, gender, jobRole, department, address];
    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }
}
