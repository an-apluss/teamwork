import express from 'express';

import Auth from '../middleware/auth';
import multer from '../middleware/imageUpload';
import gifController from '../controllers/gifController';

const route = express.Router();

const { checkToken } = Auth;
const { createGif } = gifController;

route.post('/', checkToken, multer, createGif);

export default route;
