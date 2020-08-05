import { Router } from 'express';
import connectionsController from './controllers/ConnectionsController';

const routes = Router();

routes.get('/', connectionsController.index);
routes.post('/', connectionsController.create);

export default routes;
