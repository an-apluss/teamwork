import express from 'express';

import feedController from '../controllers/feedController';

const route = express.Router();

const { fetchPosts } = feedController;

route.get('/', fetchPosts);

export default route;
