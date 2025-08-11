import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const candleTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const CandleTypesCollection = db.model('candleType', candleTypeSchema);
