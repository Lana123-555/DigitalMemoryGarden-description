import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Ensures that a directory exists. If it does not exist, it will be created.
 * @param {string} dirPath - The path to the directory.
 */
export const createDirIfNotExist = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (err) {
    // Ignore error if directory already exists
    if (err.code !== 'EEXIST') throw err;
  }
};
