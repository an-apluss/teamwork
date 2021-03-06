import Gif from '../models/gif';
import Comment from '../models/comment';
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
        result: 'Gif post cannot be found'
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

  static async fetchOne(gifId) {
    const gif = await Gif.findOne('id', gifId);

    if (!gif) {
      return {
        code: 404,
        status: 'error',
        result: 'Gif post cannot be found'
      };
    }

    let comments;
    const gifComments = await Comment.find('gifid', gifId);

    if (gifComments) {
      comments = gifComments.map(gifComment => {
        const mappedresult = {
          commentId: gifComment.id,
          authorId: gifComment.userid,
          comment: gifComment.comment
        };

        return mappedresult;
      });
    }

    const { id, title, imageurl, createdon } = gif;

    return {
      code: 200,
      status: 'success',
      result: {
        id: parseInt(id, 10),
        title,
        url: imageurl,
        createdOn: createdon,
        comments
      }
    };
  }

  /**
   *
   * Handles the logic to create a comment
   * @static
   * @param {number} gifId
   * @param {number} userId
   * @param {string} comment
   * @returns {object}
   * @memberof GifService
   */
  static async createComment(gifId, userId, comment) {
    const gif = await Gif.findOne('id', gifId);

    if (!gif) {
      return {
        code: 404,
        status: 'error',
        result: 'Gif post cannot be found'
      };
    }

    const commentInfo = await Comment.save(userId, 'gifid', gifId, comment);
    const { createdon } = commentInfo;

    return {
      code: 201,
      status: 'success',
      result: {
        message: 'comment successfully created',
        createdOn: createdon,
        gifTitle: gif.title,
        comment
      }
    };
  }
}
