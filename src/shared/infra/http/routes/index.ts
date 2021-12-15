import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import beerRoutes from '@modules/beers/infra/http/routes/beers.routes';
import frontRoutes from '@modules/users/infra/http/routes/front.routes';

const routes = Router();

routes.get('/health', (req, res) => {
  res.json({ up: true });
});

routes.use('/auth', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/beers', beerRoutes);
routes.use('/', frontRoutes);

export default routes;
