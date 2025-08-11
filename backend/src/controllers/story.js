import createHttpError from 'http-errors';
import {
  createStory,
  getStoryById,
  getStoryByStoryId,
  getAllStories,
  updateStory,
  deleteStory,
  searchStories,
  getRandomFlowerStory,
  getStoriesByCategory,
  getNextStory,
  getPrevStory,
  getStoriesContextByCategory,
  getStoriesForGallery,
} from '../services/story.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// POST /stories
export const createStoryController = async (req, res, next) => {
  try {
    console.log('🔄 Story creation started');
    console.log('📝 Request body:', {
      storyId: req.body.storyId,
      source: req.body.source,
      title: req.body.title,
      name: req.body.name,
      category: req.body.category,
    });
    console.log(
      '📁 Request files:',
      req.files ? Object.keys(req.files) : 'No files',
    );

    if (req.files) {
      for (const [field, files] of Object.entries(req.files)) {
        if (files && files.length > 0) {
          console.log(`📎 ${field}:`, {
            name: files[0].originalname,
            size: files[0].size,
            mimetype: files[0].mimetype,
          });
        }
      }
    }

    let media = {};
    if (req.files) {
      // req.files is an object: { photo: [file], audio: [file], video: [file] }
      const fieldToFolder = {
        photo: 'stories/images',
        audio: 'stories/audio',
        video: 'stories/video',
      };
      for (const field of Object.keys(fieldToFolder)) {
        const filesArr = req.files[field];
        if (filesArr && filesArr.length > 0) {
          const file = filesArr[0];
          const folder = fieldToFolder[field];
          console.log(
            `☁️ Uploading ${field} file to Cloudinary folder: ${folder}`,
          );
          media[field] = await saveFileToCloudinary(file, folder);
          console.log(`✅ ${field} uploaded to Cloudinary successfully`);
        }
      }
    }
    const payload = {
      ...req.body,
      media: Object.keys(media).length ? media : undefined,
      location: req.body.location || undefined,
      age: req.body.age ? Number(req.body.age) : undefined,
    };

    console.log('🚀 Creating story with payload:', {
      storyId: payload.storyId,
      source: payload.source,
      hasMedia: !!payload.media,
      mediaKeys: payload.media ? Object.keys(payload.media) : [],
    });

    const story = await createStory(payload);
    console.log('✅ Story created successfully:', story._id);
    res.status(201).send(story);
  } catch (err) {
    console.error('❌ Error creating story:', {
      message: err.message,
      code: err.code,
      stack: err.stack,
    });

    if (err.code === 'LIMIT_FILE_SIZE') {
      next(createHttpError(400, 'File too large. Maximum size is 10MB.'));
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      next(createHttpError(400, 'Too many files. Maximum is 3 files.'));
    } else if (err.code === 'LIMIT_FIELD_VALUE') {
      next(createHttpError(400, 'Field value too large.'));
    } else if (err.message && err.message.includes('Invalid file type')) {
      next(createHttpError(400, err.message));
    } else {
      next(createHttpError(400, err.message));
    }
  }
};

// GET /stories/:id
export const getStoryByIdController = async (req, res, next) => {
  const story = await getStoryById(req.params.id);
  if (!story) return res.status(404).send({ message: 'Story not found' });
  res.status(200).send(story);
};

// GET /stories/story/:storyId
export const getStoryByStoryIdController = async (req, res, next) => {
  const story = await getStoryByStoryId(req.params.storyId);
  if (!story) return res.status(404).send({ message: 'Story not found' });
  res.status(200).send(story);
};

// GET /stories
export const getAllStoriesController = async (req, res, next) => {
  const filter = {};
  if (req.query.source) filter.source = req.query.source;
  const stories = await getAllStories(filter, { sort: { createdAt: -1 } });
  res.status(200).send(stories);
};

// PATCH /stories/:id
export const updateStoryController = async (req, res, next) => {
  const updated = await updateStory(req.params.id, req.body);
  if (!updated) return res.status(404).send({ message: 'Story not found' });
  res.status(200).send(updated);
};

// DELETE /stories/:id
export const deleteStoryController = async (req, res, next) => {
  const deleted = await deleteStory(req.params.id);
  if (!deleted) return res.status(404).send({ message: 'Story not found' });
  res.status(204).send();
};

// POST /stories/search
export const searchStoriesController = async (req, res, next) => {
  try {
    const { query, source } = req.body;
    if (typeof query !== 'string' || !query.trim()) {
      return res.status(200).send([]);
    }
    const results = await searchStories(query, source);
    res.status(200).send(results);
  } catch (err) {
    next(createHttpError(400, err.message));
  }
};

// GET /stories/random-flower
export const getRandomFlowerStoryController = async (req, res, next) => {
  try {
    const story = await getRandomFlowerStory();
    if (!story)
      return res.status(404).send({ message: 'No flower stories found' });
    res.status(200).send(story);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

// GET /stories/category/:categoryId
export const getStoriesByCategoryController = async (req, res, next) => {
  try {
    const { page = 1, limit = 4 } = req.query;
    const { stories, totalCount } = await getStoriesByCategory(
      req.params.categoryId,
      Number(page),
      Number(limit),
    );
    res.status(200).send({ stories, totalCount });
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

// POST /stories/next
export const getNextStoryController = async (req, res, next) => {
  try {
    const { id, storyId } = req.body;
    let current;
    if (id) current = await getStoryById(id);
    else if (storyId) current = await getStoryByStoryId(storyId);
    if (!current)
      return res.status(404).send({ message: 'Current story not found' });
    const next = await getNextStory(current.createdAt);
    res.status(200).send(next);
  } catch (err) {
    next(createHttpError(400, err.message));
  }
};

// POST /stories/prev
export const getPrevStoryController = async (req, res, next) => {
  try {
    const { id, storyId } = req.body;
    let current;
    if (id) current = await getStoryById(id);
    else if (storyId) current = await getStoryByStoryId(storyId);
    if (!current)
      return res.status(404).send({ message: 'Current story not found' });
    const prev = await getPrevStory(current.createdAt);
    res.status(200).send(prev);
  } catch (err) {
    next(createHttpError(400, err.message));
  }
};

// GET /stories/category/:categoryId/context/:storyId
export const getStoriesContextByCategoryController = async (req, res, next) => {
  try {
    const { categoryId, storyId } = req.params;
    const limit = Number(req.query.limit) || 4;
    const stories = await getStoriesContextByCategory(
      categoryId,
      storyId,
      limit,
    );
    res.status(200).send(stories);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

// GET /stories/gallery
export const getStoriesForGalleryController = async (req, res, next) => {
  try {
    const { mediaType, categoryId, page = 1, limit = 12 } = req.query;

    if (!mediaType || !['photo', 'video', 'audio'].includes(mediaType)) {
      return res
        .status(400)
        .send({ message: 'Valid mediaType (photo, video, audio) is required' });
    }

    const result = await getStoriesForGallery(
      mediaType,
      categoryId || null,
      Number(page),
      Number(limit),
    );

    res.status(200).send(result);
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};
