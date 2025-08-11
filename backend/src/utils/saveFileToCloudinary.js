import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file, folder) => {
  try {
    console.log(`☁️ Uploading file to Cloudinary folder: ${folder}`);
    console.log(`🔧 File details:`, {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    });

    const uploadOptions = {
      folder: folder, // Папка в Cloudinary
      resource_type: 'auto', // Автоматично визначити тип ресурсу (image, video, raw)
      public_id: file.filename.split('.')[0], // Використовуємо ім'я файлу без розширення як public_id
    };

    console.log(`☁️ Uploading from: ${file.path}`);

    const response = await cloudinary.v2.uploader.upload(
      file.path,
      uploadOptions,
    );

    // Видаляємо тимчасовий файл після успішного завантаження
    await fs.unlink(file.path);

    console.log(
      `✅ File uploaded successfully to Cloudinary: ${response.secure_url}`,
    );

    return response.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading file to Cloudinary:`, error);

    // Спробуємо видалити тимчасовий файл навіть у разі помилки
    try {
      await fs.unlink(file.path);
    } catch (unlinkError) {
      console.error(`❌ Error deleting temp file:`, unlinkError);
    }

    throw error;
  }
};
