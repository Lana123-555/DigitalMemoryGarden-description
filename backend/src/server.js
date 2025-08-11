import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';

import router from './routers/index.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const PORT = Number(env('PORT', '3000'));

  const app = express();
  app.use(express.json());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(
    cors({
      origin: env('CLIENT_DOMAIN'),
      credentials: true,
    }),
  );
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use('/api/', router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
