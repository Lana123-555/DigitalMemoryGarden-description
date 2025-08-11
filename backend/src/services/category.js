import { CategoriesCollection } from '../models/category.js';

export const getAllCategories = async () => {
  return await CategoriesCollection.find();
};

export const addCategory = async (payload) => {
  console.log(payload);
  return await CategoriesCollection.create(payload);
};

export const updateCategory = async (id, payload) => {
  return await CategoriesCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteCategory = async (id) => {
  return await CategoriesCollection.findByIdAndDelete(id);
};
