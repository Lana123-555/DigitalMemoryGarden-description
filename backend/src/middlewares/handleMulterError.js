import createHttpError from 'http-errors';

export const handleMulterError = (err, req, res, next) => {
  if (err) {
    console.error('Multer error:', err);

    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(
        createHttpError(
          400,
          'File too large. Maximum: Photos 10MB, Audio 25MB, Video 100MB.',
        ),
      );
    }

    if (err.code === 'LIMIT_FILE_COUNT') {
      return next(
        createHttpError(400, 'Too many files. Maximum is 3 files total.'),
      );
    }

    if (err.code === 'LIMIT_FIELD_VALUE') {
      return next(
        createHttpError(
          400,
          'Field value too large. Maximum is 1MB per text field.',
        ),
      );
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return next(
        createHttpError(
          400,
          'Unexpected file field. Only photo, audio, and video are allowed.',
        ),
      );
    }

    if (err.message && err.message.includes('Invalid file type')) {
      return next(createHttpError(400, err.message));
    }

    return next(createHttpError(400, 'File upload error: ' + err.message));
  }

  next();
};
