import express from 'express';

import userController from '../controllers/userController';

const route = express.Router();
const { signin } = userController;

route.post('/signin', signin);

export default route;
