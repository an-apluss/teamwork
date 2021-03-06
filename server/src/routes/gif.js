import express from 'express';

import Auth from '../middleware/auth';
import multer from '../middleware/imageUpload';
import gifValidator from '../middleware/gifValidation';
import gifController from '../controllers/gifController';

const route = express.Router();

const { checkToken } = Auth;
const { checkGifPost, checkGifOwner, checkGifId, checkGifComment } = gifValidator;
const { createGif, deleteGif, fetchOneGif, createComment } = gifController;

route.post('/', checkToken, multer, checkGifPost, createGif);
route.delete('/:gifId', checkGifId, checkToken, checkGifOwner, deleteGif);
route.get('/:gifId', checkGifId, checkToken, fetchOneGif);
route.post('/:gifId/comment', checkGifId, checkToken, checkGifComment, createComment);

export default route;
