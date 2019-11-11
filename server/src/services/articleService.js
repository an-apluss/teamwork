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

  /**
   *
   * Handles the logic to create an article post
   * @static
   * @param {object} articleData
   * @param {number} userId
   * @returns {object}
   * @memberof ArticleService
   */
  static async create(articleData, userId) {
    const { title, article } = articleData;

    const articleInfo = await Article.save(userId, title, article);
    const { id, createdon } = articleInfo;

    return {
      code: 201,
      status: 'success',
      result: {
        message: 'Article successfully posted',
        articleId: id,
        createdOn: createdon,
        title: articleInfo.title
      }
    };
  }

  /**
   *
   * Handles the logic to delete a specific article
   * @static
   * @param {number} articleId
   * @returns {object}
   * @memberof ArticleService
   */
  static async delete(articleId) {
    await Article.deleteOne('id', articleId);

    return {
      code: 200,
      status: 'success',
      data: {
        message: 'Article successfully deleted',
        id: parseInt(articleId, 10)
      }
    };
  }

  /**
   *
   * Handles the logic to comment on an article
   * @static
   * @param {number} articleId ID of the article to be commented on
   * @param {number} userId ID of the user commenting on the article
   * @param {string} comment user comment
   * @returns
   * @memberof ArticleService
   */
  static async createComment(articleId, userId, comment) {
    const articleInfo = await Article.findOne('id', articleId);
    const { title, article } = articleInfo;

    const commentInfo = await Comment.save(userId, articleId, comment);
    const { createdon } = commentInfo;

    return {
      code: 201,
      status: 'success',
      data: {
        message: 'comment successfully created',
        createdOn: createdon,
        articleTitle: title,
        article,
        comment
      }
    };
  }
}
