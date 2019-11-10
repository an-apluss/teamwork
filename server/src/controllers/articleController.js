import articleService from '../services/articleService';

export default class ArticleController {
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
}
