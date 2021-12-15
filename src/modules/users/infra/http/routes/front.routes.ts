import express, { Router } from 'express';
import { join } from 'path';

const routes = Router();

routes.use('/', express.static(join(__dirname, '..', 'public')));

export default routes;
