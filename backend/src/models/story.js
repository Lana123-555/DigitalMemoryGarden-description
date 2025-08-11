import mongoose from 'mongoose';
import { env } from '../utils/env.js';

const db = mongoose.connection.useDb(env('MONGODB_DB'));

const storySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    comment: { type: String, trim: true },
    name: { type: String, trim: true },
    age: { type: Number, min: 0 },
    location: { type: String, trim: true },
    dateOfBirth: { type: Date },
    dateOfDeath: { type: Date },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    candleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'candleType',
      required: function () {
        return this.source === 'candle';
      },
    },
    createdAt: { type: Date, default: Date.now, immutable: true },
    media: {
      photo: { type: String },
      audio: { type: String },
      video: { type: String },
    },
    storyId: {
      type: String,
      unique: true,
      sparse: true,
      match: /^[FCAG]\d{8}$/,
    },
    source: {
      type: String,
      enum: ['flower', 'candle', 'archive', 'gallery'],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const StoriesCollection = db.model('story', storySchema);
