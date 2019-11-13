import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import userRoute from './routes/user';
import gifRoute from './routes/gif';
import articleRoute from './routes/article';
import feedRoute from './routes/feed';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: { message: 'Welcome to Teamwork App!' }
  });
});

app.get('/documentation', (req, res) => {
  return res.redirect('https://documenter.getpostman.com/view/8110937/SW7UbVk3');
});

app.use('/api/v1/auth', userRoute);
app.use('/api/v1/gifs', gifRoute);
app.use('/api/v1/articles', articleRoute);
app.use('/api/v1/feed', feedRoute);

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ status: 'error', error: error.message });
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}...`);
});

export default app;
