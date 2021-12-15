import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import BeersController from '../controllers/BeersController';

const routes = Router();

const beersController = new BeersController();

routes.use(ensureAuthenticated);

routes.get('/', beersController.list);

export default routes;
