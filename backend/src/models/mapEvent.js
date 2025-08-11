import mongoose from 'mongoose';
const { Schema, Types } = mongoose;
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const mapEventSchema = new Schema(
  {
    x: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    y: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    miniatureImage: {
      type: String,
      required: true,
    },
    zIndex: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: 1,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const MapEventsCollection = db.model('mapEvent', mapEventSchema);
