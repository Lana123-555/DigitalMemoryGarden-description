import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authAdmin } from '../middlewares/authAdmin.js';

import {
  createCandleTypeController,
  getCandleTypeByIdController,
  getAllCandleTypesController,
  getAllCandleTypesForAdminController,
  updateCandleTypeController,
  deleteCandleTypeController,
} from '../controllers/candleType.js';

const router = Router();

// GET /candle-types/admin (for admin panel)
router.get(
  '/admin',
  authAdmin,
  ctrlWrapper(getAllCandleTypesForAdminController),
);

// POST /candle-types
router.post(
  '/',
  authAdmin,
  upload.single('image'),
  ctrlWrapper(createCandleTypeController),
);

// GET /candle-types
router.get('/', ctrlWrapper(getAllCandleTypesController));

// GET /candle-types/:id
router.get('/:id', isValidId, ctrlWrapper(getCandleTypeByIdController));

// PATCH /candle-types/:id
router.patch(
  '/:id',
  isValidId,
  authAdmin,
  upload.single('image'),
  ctrlWrapper(updateCandleTypeController),
);

// DELETE /candle-types/:id
router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteCandleTypeController),
);

export default router;
