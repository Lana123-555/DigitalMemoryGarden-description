import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { upload } from '../middlewares/multer.js';

import {
  getAllCategoriesController,
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from '../controllers/category.js';

const router = Router();

router.get('/', ctrlWrapper(getAllCategoriesController));

router.post(
  '/',
  authAdmin,
  upload.fields([
    { name: 'flowerImage', maxCount: 1 },
    { name: 'flowerAnimation', maxCount: 1 },
    { name: 'miniatureImage', maxCount: 1 },
  ]),
  ctrlWrapper(addCategoryController),
);

router.patch(
  '/:id',
  isValidId,
  authAdmin,
  upload.fields([
    { name: 'flowerImage', maxCount: 1 },
    { name: 'flowerAnimation', maxCount: 1 },
    { name: 'miniatureImage', maxCount: 1 },
  ]),
  ctrlWrapper(updateCategoryController),
);

router.delete(
  '/:id',
  isValidId,
  authAdmin,
  ctrlWrapper(deleteCategoryController),
);

export default router;
