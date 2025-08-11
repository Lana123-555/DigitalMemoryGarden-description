import * as mapEventService from '../services/mapEvent.js';

export async function getAllMapEventsController(req, res, next) {
  try {
    const events = await mapEventService.getAllMapEvents();
    res.json(events);
  } catch (e) {
    next(e);
  }
}

export async function createMapEventController(req, res, next) {
  try {
    const { x, y, category, title, zIndex } = req.body;
    const event = await mapEventService.createMapEvent({
      x,
      y,
      category,
      title,
      zIndex,
    });
    res.status(201).json(event);
  } catch (e) {
    next(e);
  }
}

export async function updateMapEventController(req, res, next) {
  try {
    const { id } = req.params;
    const { x, y, category, title, zIndex } = req.body;
    const event = await mapEventService.updateMapEvent(id, {
      x,
      y,
      category,
      title,
      zIndex,
    });
    res.json(event);
  } catch (e) {
    next(e);
  }
}

export async function deleteMapEventController(req, res, next) {
  try {
    const { id } = req.params;
    await mapEventService.deleteMapEvent(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}
