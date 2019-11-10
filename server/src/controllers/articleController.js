import articleService from '../services/articleService';

/**
 *
 *
 * @export
 * @class ArticleController
 */
export default class ArticleController {
  /**
   *
   * Handles the logic to display the response for employee to view a specific article
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {object}
   * @memberof ArticleController
   */
  static async fetchOneArticle(req, res, next) {
    try {
      const { code, status, result } = await articleService.fetchOne(req.params.articleId);

      if (status === 'success') {
        return res.status(code).json({
          status,
          data: result
        });
      }

      return res.status(code).json({
        status,
        error: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * Handles the logic of response when employee post an article
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {object}
   * @memberof ArticleController
   */
  static async createArticle(req, res, next) {
    try {
      const { code, status, result } = await articleService.create(req.body, req.user.userId);

      return res.status(code).json({
        status,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * Handle the logic to display the response when an article is deleted
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {Object}
   * @memberof ArticleController
   */
  static async deleteArticle(req, res, next) {
    try {
      const { code, status, result } = await articleService.delete(req.params.articleId);

      if (status === 'success') {
        return res.status(code).json({
          status,
          data: result
        });
      }

      return res.status(code).json({
        status,
        error: result
      });
    } catch (error) {
      next(error);
    }
  }
}
