import { StoriesCollection } from '../models/story.js';
import { CategoriesCollection } from '../models/category.js';
import { CandleTypesCollection } from '../models/candleType.js';

// Generate unique story ID with prefix based on source
const generateStoryId = async (source) => {
  const prefix = source === 'flower' ? 'F' : source === 'candle' ? 'C' : 'A';
  let id;
  let exists = true;
  while (exists) {
    const randomNum = Math.floor(
      10000000 + Math.random() * 90000000,
    ).toString();
    id = prefix + randomNum;
    exists = await StoriesCollection.exists({ storyId: id });
  }
  return id;
};

export const createStory = async (payload) => {
  if (!payload.category || !payload.source) {
    throw new Error('Missing required fields');
  }

  // Title is required only for flowers
  if (payload.source === 'flower' && !payload.title) {
    throw new Error('Title is required for flower stories');
  }

  // CandleType is required for candles
  if (payload.source === 'candle' && !payload.candleType) {
    throw new Error('CandleType is required for candle stories');
  }

  const categoryExists = await CategoriesCollection.exists({
    _id: payload.category,
  });
  if (!categoryExists) throw new Error('Category not found');

  // Check if candleType exists for candles
  if (payload.candleType) {
    const candleTypeExists = await CandleTypesCollection.exists({
      _id: payload.candleType,
    });
    if (!candleTypeExists) throw new Error('CandleType not found');
  }

  // Use provided storyId or generate new one
  let storyId = payload.storyId;
  if (!storyId) {
    storyId = await generateStoryId(payload.source);
  } else {
    // Validate provided storyId format
    const storyIdRegex = /^[FCAG]\d{8}$/;
    if (!storyIdRegex.test(storyId)) {
      throw new Error('Invalid storyId format');
    }
    // Check if storyId already exists
    const exists = await StoriesCollection.exists({ storyId });
    if (exists) {
      throw new Error('StoryId already exists');
    }
  }

  const story = await StoriesCollection.create({
    ...payload,
    storyId,
  });

  // Manually populate category and candleType for the response
  const category = story.category
    ? await CategoriesCollection.findById(story.category)
    : null;
  const candleType = story.candleType
    ? await CandleTypesCollection.findById(story.candleType)
    : null;

  const result = story.toObject();
  result.category = category;
  if (candleType) result.candleType = candleType;

  return result;
};

export const getStoryById = async (id) => {
  const story = await StoriesCollection.findById(id);
  if (!story) return null;
  const category = story.category
    ? await CategoriesCollection.findById(story.category)
    : null;
  const candleType = story.candleType
    ? await CandleTypesCollection.findById(story.candleType)
    : null;
  const result = story.toObject();
  result.category = category;
  if (candleType) result.candleType = candleType;
  return result;
};

export const getStoryByStoryId = async (storyId) => {
  const story = await StoriesCollection.findOne({ storyId });
  if (!story) return null;
  const category = story.category
    ? await CategoriesCollection.findById(story.category)
    : null;
  const candleType = story.candleType
    ? await CandleTypesCollection.findById(story.candleType)
    : null;
  const result = story.toObject();
  result.category = category;
  if (candleType) result.candleType = candleType;
  return result;
};

export const getAllStories = async (filter = {}, options = {}) => {
  // options: { sort: { createdAt: -1 } }
  return await StoriesCollection.find(filter).sort(options.sort || {});
};

export const updateStory = async (id, payload) => {
  return await StoriesCollection.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteStory = async (id) => {
  return await StoriesCollection.findByIdAndDelete(id);
};

export const searchStories = async (query, source = null) => {
  if (typeof query !== 'string' || !query.trim()) return [];
  const regex = new RegExp(query, 'i');

  let searchFilter = {
    $or: [
      { title: regex },
      { name: regex },
      { comment: regex },
      { location: regex },
      { storyId: regex },
    ],
  };

  // Add source filter if provided
  if (source && ['flower', 'candle', 'archive'].includes(source)) {
    searchFilter.source = source;
  }

  const stories = await StoriesCollection.find(searchFilter);

  // Manually populate category and candleType
  return await Promise.all(
    stories.map(async (storyDoc) => {
      const story = storyDoc.toObject();
      if (story.category) {
        story.category = await CategoriesCollection.findById(story.category);
      }
      if (story.candleType) {
        story.candleType = await CandleTypesCollection.findById(
          story.candleType,
        );
      }
      return story;
    }),
  );
};

// Get next story (by createdAt, source: 'flower')
export const getNextStory = async (createdAt) => {
  const next = await StoriesCollection.findOne({
    source: 'flower',
    createdAt: { $gt: createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(1);
  if (!next) return null;
  const story = next.toObject();
  if (story.category) {
    story.category = await CategoriesCollection.findById(story.category);
  }
  return story;
};

// Get previous story (by createdAt, source: 'flower')
export const getPrevStory = async (createdAt) => {
  const prev = await StoriesCollection.findOne({
    source: 'flower',
    createdAt: { $lt: createdAt },
  })
    .sort({ createdAt: -1 })
    .limit(1);
  if (!prev) return null;
  const story = prev.toObject();
  if (story.category) {
    story.category = await CategoriesCollection.findById(story.category);
  }
  return story;
};
// Get a random flower story (source: 'flower')
export const getRandomFlowerStory = async () => {
  const count = await StoriesCollection.countDocuments({ source: 'flower' });
  if (count === 0) return null;
  const random = Math.floor(Math.random() * count);
  const stories = await StoriesCollection.find({ source: 'flower' })
    .skip(random)
    .limit(1);
  if (!stories.length) return null;
  // Populate category for consistency
  const story = stories[0].toObject();
  if (story.category) {
    story.category = await CategoriesCollection.findById(story.category);
  }
  return story;
};

// Get all stories by category, newest first
export const getStoriesByCategory = async (categoryId, page = 1, limit = 4) => {
  const skip = (page - 1) * limit;
  // Повертаємо лише історії з НЕпорожнім коментарем (ігноруємо null, '', та лише пробіли)
  const filter = {
    category: categoryId,
    comment: { $exists: true, $not: /^\s*$/ },
  };
  const [stories, totalCount] = await Promise.all([
    StoriesCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    StoriesCollection.countDocuments(filter),
  ]);
  const result = await Promise.all(
    stories.map(async (storyDoc) => {
      const story = storyDoc.toObject();
      if (story.category) {
        story.category = await CategoriesCollection.findById(story.category);
      }
      return story;
    }),
  );
  return { stories: result, totalCount };
};

// Отримати 4 історії з категорії навколо storyId (шуканий + сусіди)
export const getStoriesContextByCategory = async (
  categoryId,
  storyId,
  limit = 4,
) => {
  // 1. Знайти шукану історію
  const current = await StoriesCollection.findOne({
    _id: storyId,
    category: categoryId,
  });
  if (!current) return [];
  // 2. Знайти сусідів (новіші за шукану)
  const after = await StoriesCollection.find({
    category: categoryId,
    createdAt: { $gt: current.createdAt },
  })
    .sort({ createdAt: 1 })
    .limit(limit - 1);
  // 3. Якщо не вистачає, добрати старіших
  let result = [current, ...after];
  if (result.length < limit) {
    const before = await StoriesCollection.find({
      category: categoryId,
      createdAt: { $lt: current.createdAt },
    })
      .sort({ createdAt: -1 })
      .limit(limit - result.length);
    result = [current, ...after, ...before];
  }
  // 4. Відсортувати за createdAt (від новіших до старіших)
  result = result
    .map((doc) => doc.toObject())
    .sort((a, b) => b.createdAt - a.createdAt);
  // 5. Populate category
  for (const story of result) {
    if (story.category) {
      story.category = await CategoriesCollection.findById(story.category);
    }
  }
  return result;
};

// Get stories with media for gallery with pagination and filtering
export const getStoriesForGallery = async (
  mediaType,
  categoryId = null,
  page = 1,
  limit = 12,
) => {
  const skip = (page - 1) * limit;

  // Build filter based on media type
  let filter = {};

  // Filter by media type
  if (mediaType === 'photo') {
    filter['media.photo'] = { $exists: true, $ne: null };
  } else if (mediaType === 'video') {
    filter['media.video'] = { $exists: true, $ne: null };
  } else if (mediaType === 'audio') {
    filter['media.audio'] = { $exists: true, $ne: null };
  }

  // Filter by category if provided
  if (categoryId) {
    filter.category = categoryId;
  }

  const [stories, totalCount] = await Promise.all([
    StoriesCollection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    StoriesCollection.countDocuments(filter),
  ]);

  // Populate categories
  const result = await Promise.all(
    stories.map(async (storyDoc) => {
      const story = storyDoc.toObject();
      if (story.category) {
        story.category = await CategoriesCollection.findById(story.category);
      }
      return story;
    }),
  );

  return {
    stories: result,
    totalCount,
    hasMore: skip + stories.length < totalCount,
  };
};
