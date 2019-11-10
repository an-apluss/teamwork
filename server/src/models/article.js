import db from './db';

/**
 *
 *
 * @export
 * @class Article
 */
export default class Article {
  /**
   *
   * Handles the logic to fetch a specific article by attribute/field from articles table
   * @static
   * @param {String} field the attribute of the articles table to query the database
   * @param {String} value the value of the attribute
   * @returns {Object}
   * @memberof Article
   */
  static async findOne(field, value) {
    const sqlQuery = `SELECT * FROM articles WHERE ${field} = $1`;
    const { rows, rowCount } = await db.query(sqlQuery, [value]);

    if (rowCount > 0) return rows[0];

    return false;
  }

  /**
   *
   * Handle the logic to create an article in articles table
   * @static
   * @param {number} userId
   * @param {string} title
   * @param {string} article
   * @returns {object}
   * @memberof Article
   */
  static async save(userId, title, article) {
    const sqlQuery = `INSERT INTO articles(userid, title, article) VALUES($1, $2, $3) returning *`;
    const values = [userId, title, article];
    const { rows } = await db.query(sqlQuery, values);

    return rows[0];
  }
}
