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
}
