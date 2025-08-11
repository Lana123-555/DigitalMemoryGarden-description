import { MapEventsCollection } from '../models/mapEvent.js';
import { CategoriesCollection } from '../models/category.js';

export async function getAllMapEvents() {
  const events = await MapEventsCollection.find();
  return await Promise.all(
    events.map(async (eventDoc) => {
      const event = eventDoc.toObject();
      if (event.category) {
        event.category = await CategoriesCollection.findById(event.category);
      }
      return event;
    }),
  );
}

export async function createMapEvent({ x, y, category, title, zIndex = 1 }) {
  const cat = await CategoriesCollection.findById(category);
  if (!cat) throw new Error('Category not found');
  const miniatureImage = cat.miniatureImage;
  const event = new MapEventsCollection({
    x,
    y,
    category,
    title,
    miniatureImage,
    zIndex,
  });
  return event.save();
}

export async function updateMapEvent(id, { x, y, category, title, zIndex }) {
  const update = { x, y, category, title };
  if (typeof zIndex === 'number') update.zIndex = zIndex;
  if (category) {
    const cat = await CategoriesCollection.findById(category);
    if (!cat) throw new Error('Category not found');
    update.miniatureImage = cat.miniatureImage;
  }
  return MapEventsCollection.findByIdAndUpdate(id, update, { new: true });
}

export async function deleteMapEvent(id) {
  return MapEventsCollection.findByIdAndDelete(id);
}
