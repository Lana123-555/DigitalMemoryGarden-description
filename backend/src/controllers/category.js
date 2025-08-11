import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../services/category.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllCategoriesController = async (req, res, next) => {
  const categories = await getAllCategories();
  res.status(200).send(categories);
};

export const addCategoryController = async (req, res, next) => {
  const { name, description } = req.body;
  let flowerImage = '';
  let flowerAnimation = '';
  let miniatureImage = '';

  if (req.files?.flowerImage?.[0]) {
    flowerImage = await saveFileToCloudinary(
      req.files.flowerImage[0],
      'categories/images',
    );
  }
  if (req.files?.flowerAnimation?.[0]) {
    flowerAnimation = await saveFileToCloudinary(
      req.files.flowerAnimation[0],
      'categories/animations',
    );
  }
  if (req.files?.miniatureImage?.[0]) {
    miniatureImage = await saveFileToCloudinary(
      req.files.miniatureImage[0],
      'categories/miniatures',
    );
  }

  const newCategory = await addCategory({
    name,
    description,
    flowerImage,
    flowerAnimation,
    miniatureImage,
  });

  res.status(201).send(newCategory);
};

export const updateCategoryController = async (req, res, next) => {
  const { name, description } = req.body;
  let flowerImage, flowerAnimation, miniatureImage;

  if (req.files?.flowerImage?.[0]) {
    flowerImage = await saveFileToCloudinary(
      req.files.flowerImage[0],
      'categories/images',
    );
  }
  if (req.files?.flowerAnimation?.[0]) {
    flowerAnimation = await saveFileToCloudinary(
      req.files.flowerAnimation[0],
      'categories/animations',
    );
  }
  if (req.files?.miniatureImage?.[0]) {
    miniatureImage = await saveFileToCloudinary(
      req.files.miniatureImage[0],
      'categories/miniatures',
    );
  }

  const updatePayload = {
    ...(name && { name }),
    ...(description && { description }),
    ...(flowerImage && { flowerImage }),
    ...(flowerAnimation && { flowerAnimation }),
    ...(miniatureImage && { miniatureImage }),
  };

  const updatedCategory = await updateCategory(req.params.id, updatePayload);
  if (!updatedCategory)
    return res.status(404).send({ message: 'Category not found' });
  res.status(200).send(updatedCategory);
};

export const deleteCategoryController = async (req, res, next) => {
  const deletedCategory = await deleteCategory(req.params.id);
  if (!deletedCategory)
    return res.status(404).send({ message: 'Category not found' });
  res.status(204).send();
};
