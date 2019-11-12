import feedService from '../services/feedService';

/**
 *
 *
 * @export
 * @class FeedController
 */
export default class FeedController {
  /**
   *
   * Handles how the response of all available post display
   * @static
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   * @memberof FeedController
   */
  static async fetchPosts(req, res, next) {
    try {
      const { code, status, data } = await feedService.fetch();

      return res.status(code).json({ status, data });
    } catch (error) {
      next(error);
    }
  }
}
