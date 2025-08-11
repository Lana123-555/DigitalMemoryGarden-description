import { Router } from 'express';
import * as ctrl from '../controllers/mapEvent.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { validateMapEvent } from '../validation/validateMapEvent.js';

const router = Router();

router.get('/', ctrl.getAllMapEventsController);
router.post('/', authAdmin, validateMapEvent, ctrl.createMapEventController);
router.put('/:id', authAdmin, validateMapEvent, ctrl.updateMapEventController);
router.delete('/:id', authAdmin, ctrl.deleteMapEventController);

export default router;
