import express from 'express';

import articleController from '../controllers/articleController';
import Auth from '../middleware/auth';
import articleValidator from '../middleware/articleValidation';

const route = express.Router();

const { checkToken } = Auth;
const { fetchOneArticle, createArticle, deleteArticle } = articleController;
const { checkArticleId, checkArticlePostData } = articleValidator;

route.get('/:articleId', checkArticleId, checkToken, fetchOneArticle);
route.post('/', checkToken, checkArticlePostData, createArticle);
route.delete('/:articleId', checkArticleId, checkToken, deleteArticle);

export default route;
