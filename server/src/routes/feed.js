import express from 'express';

import feedController from '../controllers/feedController';
import Auth from '../middleware/auth';

const route = express.Router();

const { fetchPosts } = feedController;
const { checkToken } = Auth;

route.get('/', checkToken, fetchPosts);

export default route;
