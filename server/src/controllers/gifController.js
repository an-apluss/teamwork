import gifService from '../services/gifService';

/**
 *
 *
 * @export
 * @class GifController
 */
export default class GifController {
  /**
   *
   * Handles the logic created image post response
   * @static
   * @param {object} req request object
   * @param {object} res response object
   * @param {*} next
   * @returns {object} return posted image information
   * @memberof GifController
   */
  static async createGif(req, res, next) {
    try {
      const { code, status, result } = await gifService.create(
        req.body,
        req.file.path,
        req.user.userId
      );

      return res.status(code).json({
        status,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}
