import express from 'express';
import { postEvent, getEvents } from './event.cntroller';

const router = express.Router();

// POST /api/v1/events - create and broadcast a new event
router.post('/', (req, res, next) => {
  const io = req.app.get('io');
  return postEvent(io)(req, res, next);
});

// GET /api/v1/events/:packageId - get all events for a package
router.get('/:packageId', getEvents);

export const EventRoutes = router;
