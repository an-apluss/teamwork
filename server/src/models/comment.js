import database from './db';

/**
 *
 *
 * @export
 * @class Comment
 */
export default class Comment {
  /**
   *
   * Handles the logic to retrieve a comments by an attribute from the comments table
   * @static
   * @param {string} field name of the comments' table attribute to be queried
   * @param {string|number} value the value of the attribute
   * @returns {Array}
   * @memberof Comment
   */
  static async find(field, value) {
    const sqlQuery = `SELECT * FROM comments WHERE ${field} = $1`;
    const { rows, rowCount } = await database.query(sqlQuery, [value]);

    if (rowCount > 0) return rows;

    return false;
  }

  /**
   *
   * Handles the logic to post a comment
   * @static
   * @param {number} userId the ID of user that comment
   * @param {string} gifOrArticleField this is to specify if the comment is for gif or article post
   * @param {string | number} gifOrArticleValue value of gifOrArticleField
   * @param {string} comment comment to be created
   * @returns
   * @memberof Comment
   */
  static async save(userId, gifOrArticleField, gifOrArticleValue, comment) {
    const sqlQuery = `INSERT INTO comments(userid, ${gifOrArticleField}, comment) VALUES($1, $2, $3) returning *`;
    const values = [userId, gifOrArticleValue, comment];
    const { rows } = await database.query(sqlQuery, values);

    return rows[0];
  }
}
