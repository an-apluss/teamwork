import express from 'express';

import articleController from '../controllers/articleController';
import Auth from '../middleware/auth';
import articleValidator from '../middleware/articleValidation';

const route = express.Router();

const { checkToken } = Auth;
const {
  fetchOneArticle,
  createArticle,
  deleteArticle,
  createComment,
  updateArticle
} = articleController;
const {
  checkArticleId,
  checkArticlePostData,
  checkArticleOwner,
  checkArticleComment
} = articleValidator;

route.get('/:articleId', checkArticleId, checkToken, fetchOneArticle);
route.post('/', checkToken, checkArticlePostData, createArticle);
route.delete('/:articleId', checkArticleId, checkToken, checkArticleOwner, deleteArticle);
route.post('/:articleId/comment', checkArticleId, checkToken, checkArticleComment, createComment);
route.patch('/:articleId', checkArticleId, checkToken, updateArticle);

export default route;
