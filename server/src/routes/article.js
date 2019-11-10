import express from 'express';

import articleController from '../controllers/articleController';
import Auth from '../middleware/auth';

const route = express.Router();

const { checkToken } = Auth;
const { fetchOneArticle } = articleController;

route.get('/:articleId', checkToken, fetchOneArticle);

export default route;
