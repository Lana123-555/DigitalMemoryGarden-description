import { Router } from 'express';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';

import categoryRouter from './category.js';
import storiesRouter from './story.js';
import mapEventRouter from './mapEvent.js';
import candleTypeRouter from './candleType.js';

const router = Router();

router.use('/categories', categoryRouter);
router.use('/stories', storiesRouter);
router.use('/map-events', mapEventRouter);
router.use('/candle-types', candleTypeRouter);

router.post('/admin/login', (req, res, next) => {
  const adminPassword = env('ADMIN_PASSWORD');
  const providedPassword = req.headers['x-admin-password'];
  if (!providedPassword || providedPassword !== adminPassword) {
    return next(createHttpError(403, 'Incorrect admin password'));
  }

  res.status(200).send({ message: 'Successful login!' });
});

export default router;
