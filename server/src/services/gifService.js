import Gif from '../models/gif';
import helper from '../helper/helper';

const { cloudinaryUpload, cloudinaryDelete } = helper;

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

  /**
   *
   * Handles logic to delete a gif post
   * @static
   * @param {number} gifId
   * @returns {object}
   * @memberof GifService
   */
  static async delete(gifId) {
    const gif = await Gif.findOne('id', gifId);

    if (!gif) {
      return {
        code: 404,
        status: 'error',
        error: 'Gif post cannot be found'
      };
    }

    const splitImageUrl = gif.imageurl.split('/');
    const public_id = splitImageUrl[splitImageUrl.length - 1].split('.')[0];

    await cloudinaryDelete(public_id);
    await Gif.deleteOne('id', gifId);

    return {
      code: 200,
      status: 'success',
      result: {
        gifId: parseInt(gifId, 10),
        message: 'GIF post successfully deleted'
      }
    };
  }
}
