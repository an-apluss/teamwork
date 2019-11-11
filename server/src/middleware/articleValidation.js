import Joi from '@hapi/joi';
import Article from '../models/article';

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
  static async checkArticleId(req, res, next) {
    const idIsNumeric = /^[0-9]+$/.test(req.params.articleId);

    if (!idIsNumeric) {
      return res.status(403).json({
        status: 'error',
        error: 'article ID must be number'
      });
    }

    const articleInfo = await Article.findOne('id', req.params.articleId);

    if (!articleInfo) {
      return res.status(404).json({
        status: 'error',
        error: 'Article ID cannot be found'
      });
    }

    req.params.articleId = parseInt(req.params.articleId, 10);
    return next();
  }

  /**
   *
   * Handles the logic to check if article data are string and empty
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {object}
   * @memberof ArticleValidation
   */
  static checkArticlePostData(req, res, next) {
    const schema = Joi.object({
      title: Joi.string().required(),
      article: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(422).json({
        status: 'error',
        error: error.details[0].message
      });
    }

    return next();
  }

  /**
   *
   * Handles the logic to allow only the owner of an article perform deletion on such article
   * @static
   * @param {object} req
   * @param {object} res
   * @param {*} next
   * @returns {object | function}
   * @memberof ArticleValidation
   */
  static async checkArticleOwner(req, res, next) {
    const article = await Article.findOne('id', req.params.articleId);
    const { userId, isAdmin } = req.user;

    if (article.userid !== userId && !isAdmin) {
      return res.status(401).json({
        status: 'error',
        error: 'You cannot perform this action. Post does not belong to you'
      });
    }

    return next();
  }
}
