import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR, API_DOMAIN } from '../constants/index.js';

export const saveFileToUploadDir = async (file, folder) => {
  try {
    console.log(`📂 Moving file from temp to uploads/${folder}/`);
    console.log(`🔧 File details:`, {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    });

    const tempPath = path.join(TEMP_UPLOAD_DIR, file.filename);
    const newFilePath = path.join(UPLOAD_DIR, folder, file.filename);

    console.log(`📂 Moving from: ${tempPath}`);
    console.log(`📂 Moving to: ${newFilePath}`);

    await fs.rename(tempPath, newFilePath);

    const fileUrl = `${API_DOMAIN}/uploads/${folder}/${file.filename}`;
    console.log(`✅ File saved successfully: ${fileUrl}`);

    return fileUrl;
  } catch (error) {
    console.error(`❌ Error saving file to upload dir:`, error);
    throw error;
  }
};
