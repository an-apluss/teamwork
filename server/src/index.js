import express from 'express';

const app = express();

const PORT = process.env.PORT || 7000;

app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: { message: 'Welcome to Teamwork App!' }
  });
});

app.use((req, res, next) => {
  const error = new Error('Route Does not Exist');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ status: 'error', message: error.message });
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}...`);
});

export default app;
