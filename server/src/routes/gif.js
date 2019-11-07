import express from 'express';

import Auth from '../middleware/auth';
import gifController from '../controllers/gifController';

const route = express.Router();

const { checkToken } = Auth;
const { createGif } = gifController;

route.post('/', checkToken, createGif);

export default route;
