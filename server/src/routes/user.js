import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middleware/userValidation';

const route = express.Router();
const { signin, createUser } = userController;
const { signinCheck, signupCheck } = userValidator;

route.post('/signin', signinCheck, signin);
route.post('/create-user', signupCheck, createUser);

export default route;
