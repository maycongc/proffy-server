import { Router } from 'express';
import classesController from './controllers/ClassesController';

const routes = Router();

routes.get('/', classesController.index);
routes.post('/', classesController.create);

export default routes;
