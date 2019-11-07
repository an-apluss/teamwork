import Gif from '../models/gif';
import helper from '../helper/helper';

const { cloudinaryUpload } = helper;

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
  static async create(data, image, userId) {
    const { title } = data;
    const { url } = await cloudinaryUpload(image);
    const gif = await Gif.save(userId, title, url);

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
