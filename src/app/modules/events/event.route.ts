import express from 'express';
import { postEvent, getEvents } from './event.controller';
const router = express.Router();

router.post('/', postEvent);
router.get('/:packageId', getEvents);

export const EventRoutes = router;
