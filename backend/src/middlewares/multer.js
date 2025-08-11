import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Math.round(Math.random() * 1e9);
    const uniqueSuffix = Date.now();

    cb(null, `${uniquePrefix}_${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 512 * 1024 * 1024, // 512MB загальний ліміт
    files: 3, // максимум 3 файли (audio, photo, video)
    fieldSize: 1024 * 1024, // 1MB для текстових полів
  },
  fileFilter: (req, file, cb) => {
    // Дозволені типи файлів та їх розміри
    const allowedTypes = {
      photo: {
        types: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        maxSize: 12 * 1024 * 1024, // 10MB для фото
      },
      audio: {
        types: [
          'audio/mpeg',
          'audio/wav',
          'audio/mp3',
          'audio/ogg',
          'audio/mp4',
        ],
        maxSize: 25 * 1024 * 1024, // 25MB для аудіо
      },
      video: {
        types: [
          'video/mp4',
          'video/webm',
          'video/quicktime',
          'video/x-msvideo',
        ],
        maxSize: 512 * 1024 * 1024, // 512MB для відео
      },
    };

    const fieldConfig = allowedTypes[file.fieldname];
    if (!fieldConfig) {
      return cb(new Error(`Unknown field: ${file.fieldname}`), false);
    }

    // Перевіряємо тип файлу
    if (!fieldConfig.types.includes(file.mimetype)) {
      return cb(
        new Error(`Invalid file type for ${file.fieldname}: ${file.mimetype}`),
        false,
      );
    }

    // Додаткова перевірка розміру (буде перевірено знову в handleMulterError)
    cb(null, true);
  },
});
