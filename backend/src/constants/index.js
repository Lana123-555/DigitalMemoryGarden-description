import path from 'node:path';
import { env } from '../utils/env.js';

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLIENT_DOMAIN = env('CLIENT_DOMAIN') || 'http://localhost:3000';
export const API_DOMAIN = env('API_DOMAIN') || 'http://localhost:3000';

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
