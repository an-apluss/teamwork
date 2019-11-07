import express from 'express';

import Auth from '../middleware/auth';
import multer from '../middleware/imageUpload';
import gifValidator from '../middleware/gifValidation';
import gifController from '../controllers/gifController';

const route = express.Router();

const { checkToken } = Auth;
const { checkGifPost, checkGifOwner } = gifValidator;
const { createGif, deleteGif } = gifController;

route.post('/', checkToken, multer, checkGifPost, createGif);
route.delete('/:gifId', checkToken, checkGifOwner, deleteGif);

export default route;
