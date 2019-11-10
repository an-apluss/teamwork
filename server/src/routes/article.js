import express from 'express';

import articleController from '../controllers/articleController';
import Auth from '../middleware/auth';
import articleValidator from '../middleware/articleValidation';

const route = express.Router();

const { checkToken } = Auth;
const { fetchOneArticle } = articleController;
const { checkArticleId } = articleValidator;

route.get('/:articleId', checkArticleId, checkToken, fetchOneArticle);

export default route;
