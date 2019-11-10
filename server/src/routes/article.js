import express from 'express';

import articleController from '../controllers/articleController';

const route = express.Router();

const { fetchOneArticle } = articleController;

route.get('/:articleId', fetchOneArticle);

export default route;
