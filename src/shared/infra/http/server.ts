import 'reflect-metadata';
import 'dotenv/config';

import cluster from 'cluster';
import os from 'os';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import '@shared/container';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

if (cluster.isMaster && process.env.NODE_ENV !== 'development') {
  // eslint-disable-next-line no-console
  console.log(`Master ${process.pid} started on port 6001`);

  for (let i = 0; i < os.cpus().length; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    // eslint-disable-next-line no-console
    console.log(`worker ${worker.process.pid} stopped working`);
    cluster.fork();
  });
} else {
  app.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Worker ${process.pid} started on ${process.env.APP_API_URL}`);
  });
}
