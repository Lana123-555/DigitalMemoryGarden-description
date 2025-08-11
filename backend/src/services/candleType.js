import { CandleTypesCollection } from '../models/candleType.js';

export const createCandleType = async (payload) => {
  if (!payload.name || !payload.image) {
    throw new Error('Missing required fields');
  }
  return await CandleTypesCollection.create(payload);
};

export const getCandleTypeById = async (id) => {
  return await CandleTypesCollection.findById(id);
};

export const getAllCandleTypes = async (filter = {}) => {
  const activeFilter = { isActive: true, ...filter };
  return await CandleTypesCollection.find(activeFilter).sort({ createdAt: 1 });
};

export const getAllCandleTypesForAdmin = async () => {
  return await CandleTypesCollection.find().sort({ createdAt: 1 });
};

export const updateCandleType = async (id, payload) => {
  return await CandleTypesCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
};

export const deleteCandleType = async (id) => {
  return await CandleTypesCollection.findByIdAndDelete(id);
};
