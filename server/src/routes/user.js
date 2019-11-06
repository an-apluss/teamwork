import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middleware/userValidation';

const route = express.Router();
const { signin } = userController;
const { signinCheck } = userValidator;

route.post('/signin', signinCheck, signin);

export default route;
