import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

export default routes;
