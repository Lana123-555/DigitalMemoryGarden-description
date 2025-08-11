import createHttpError from 'http-errors';
import {
  createCandleType,
  getCandleTypeById,
  getAllCandleTypes,
  getAllCandleTypesForAdmin,
  updateCandleType,
  deleteCandleType,
} from '../services/candleType.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// POST /candle-types
export const createCandleTypeController = async (req, res, next) => {
  try {
    let imageUrl;
    if (req.file) {
      imageUrl = await saveFileToCloudinary(req.file, 'candle-types');
    }

    const payload = {
      ...req.body,
      ...(imageUrl && { image: imageUrl }),
    };

    const candleType = await createCandleType(payload);
    res.status(201).send(candleType);
  } catch (err) {
    next(createHttpError(400, err.message));
  }
};

export const getCandleTypeByIdController = async (req, res, next) => {
  const candleType = await getCandleTypeById(req.params.id);
  if (!candleType)
    return res.status(404).send({ message: 'Candle type not found' });
  res.status(200).send(candleType);
};

export const getAllCandleTypesController = async (req, res, next) => {
  const candleTypes = await getAllCandleTypes();
  res.status(200).send(candleTypes);
};

export const getAllCandleTypesForAdminController = async (req, res, next) => {
  const candleTypes = await getAllCandleTypesForAdmin();
  res.status(200).send(candleTypes);
};

export const updateCandleTypeController = async (req, res, next) => {
  try {
    let imageUrl;
    if (req.file) {
      imageUrl = await saveFileToCloudinary(req.file, 'candle-types');
    }

    const payload = {
      ...req.body,
      ...(imageUrl && { image: imageUrl }),
    };

    const updated = await updateCandleType(req.params.id, payload);
    if (!updated)
      return res.status(404).send({ message: 'Candle type not found' });
    res.status(200).send(updated);
  } catch (err) {
    next(createHttpError(400, err.message));
  }
};

// DELETE /candle-types/:id
export const deleteCandleTypeController = async (req, res, next) => {
  const deleted = await deleteCandleType(req.params.id);
  if (!deleted)
    return res.status(404).send({ message: 'Candle type not found' });
  res.status(204).send();
};
