import Feed from '../models/feed';

/**
 *
 *
 * @export
 * @class FeedService
 */
export default class FeedService {
  /**
   *
   *
   * @static
   * @returns
   * @memberof FeedService
   */
  static async fetch() {
    const feeds = await Feed.find();
    let posts;

    if (feeds) {
      posts = feeds.map(feed => {
        const mappedresult = {
          id: feed.id,
          createdOn: feed.createdon,
          title: feed.title
        };

        // eslint-disable-next-line no-unused-expressions
        feed.content.startsWith('http://res.cloudinary.com/an-apluss/image/upload/') &&
        feed.content.endsWith('.gif')
          ? (mappedresult.url = feed.content)
          : (mappedresult.article = feed.content);

        mappedresult.authorId = feed.userid;

        return mappedresult;
      });
    }

    return {
      code: 200,
      status: 'success',
      data: posts
    };
  }
}
