import database from './db';

/**
 *
 *
 * @export
 * @class Gif
 */
export default class Gif {
  /**
   *
   * Handles the logic to create a gif post in the gifs table
   * @static
   * @param {number} userId
   * @param {string} title
   * @param {string} imageUrl
   * @returns {Object} return the new created gif post
   * @memberof Gif
   */
  static async save(userId, title, imageUrl) {
    const sqlQuery = `INSERT INTO gifs(userid, title, imageurl) VALUES($1, $2, $3) returning *`;
    const values = [userId, title, imageUrl];
    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }

  /**
   *
   * Handles the logic to retrieve a gif by an attribute from the gifs table
   * @static
   * @param {string} field name of the gifs' table attribute to be queried
   * @param {string|number} value the value of the attribute
   * @returns
   * @memberof Gif
   */
  static async findOne(field, value) {
    const sqlQuery = `SELECT * FROM gifs WHERE ${field} = $1`;
    const { rows, rowCount } = await database.query(sqlQuery, [value]);

    if (rowCount > 0) return rows[0];

    return false;
  }

  /**
   *
   * Handles the logic to remove a gif by an attribute from the gifs table
   * @static
   * @param {string} field name of the gifs' table attribute to be queried
   * @param {string|number} value the value of the attribute
   * @memberof Gif
   */
  static async deleteOne(field, value) {
    const sqlQuery = `DELETE FROM gifs WHERE ${field} = $1`;
    await database.query(sqlQuery, [value]);
  }
}
