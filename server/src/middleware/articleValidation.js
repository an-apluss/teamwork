/**
 *
 *
 * @export
 * @class ArticleValidation
 */
export default class ArticleValidation {
  /**
   *
   * Handles the logic to check if article ID is numeric
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {Object|Function}
   * @memberof GifValidation
   */
  static checkArticleId(req, res, next) {
    const idIsNumeric = /^[0-9]+$/.test(req.params.articleId);

    if (!idIsNumeric) {
      return res.status(403).json({
        status: 'error',
        error: 'article ID must be number'
      });
    }

    req.params.articleId = parseInt(req.params.articleId, 10);
    return next();
  }
}
