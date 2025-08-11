import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    flowerImage: {
      type: String,
      default: '',
    },
    flowerAnimation: {
      type: String,
      default: '',
    },
    miniatureImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const CategoriesCollection = db.model('category', categorySchema);
