import express from 'express';

import articleController from '../controllers/articleController';
import Auth from '../middleware/auth';
import articleValidator from '../middleware/articleValidation';

const route = express.Router();

const { checkToken } = Auth;
const { fetchOneArticle, createArticle } = articleController;
const { checkArticleId } = articleValidator;

route.get('/:articleId', checkArticleId, checkToken, fetchOneArticle);
route.post('/', checkToken, createArticle);

export default route;
