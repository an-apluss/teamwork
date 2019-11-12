import db from './db';

export default class Feed {
  static async find() {
    const sqlQuery = `SELECT id, createdon, title, imageurl AS content, userid FROM gifs UNION ALL SELECT id, createdon, title, article, userid FROM articles ORDER BY createdon DESC`;
    const { rows } = await db.query(sqlQuery, []);

    return rows;
  }
}
