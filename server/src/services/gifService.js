import Gif from '../models/gif';

/**
 *
 *
 * @export
 * @class GifService
 */
export default class GifService {
  /**
   *
   * Handles the logic to post a gif image
   * @static
   * @param {object} data data of gif image to be posted
   * @returns {oject}
   * @memberof GifService
   */
  static async create(data, userId) {
    const { title, image } = data;
    const gif = await Gif.save(userId, title, image);

    return {
      code: 201,
      status: 'success',
      result: {
        gifId: gif.id,
        message: 'GIF image successfully posted',
        createdOn: gif.createdon,
        title: gif.title,
        imageUrl: gif.imageurl
      }
    };
  }
}
