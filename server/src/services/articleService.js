import Article from '../models/article';
import Comment from '../models/comment';

/**
 *
 *
 * @export
 * @class ArticleService
 */
export default class ArticleService {
  /**
   *
   * Handles the logic to fetch a specific article post and their comments
   * @static
   * @param {number} articleId
   * @returns {object}
   * @memberof ArticleService
   */
  static async fetchOne(articleId) {
    const articleInfo = await Article.findOne('id', articleId);

    if (!articleInfo) {
      return {
        code: 404,
        status: 'error',
        result: 'article ID cannot be found'
      };
    }

    const articleComments = await Comment.find('articleid', articleId);
    let comments;

    if (articleComments) {
      comments = articleComments.map(articleComment => {
        const mappedresult = {
          commentId: articleComment.id,
          authorId: articleComment.userid,
          comment: articleComment.comment
        };

        return mappedresult;
      });
    }

    const { id, createdon, title, article } = articleInfo;

    return {
      code: 200,
      status: 'success',
      result: {
        id,
        createdOn: createdon,
        title,
        article,
        comments
      }
    };
  }
}
