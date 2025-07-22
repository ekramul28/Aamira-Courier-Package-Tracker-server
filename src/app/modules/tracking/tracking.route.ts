import express from 'express';
import { postTrackingUpdate, getTracking } from './tracking.controller';

const router = express.Router();

// POST /api/v1/tracking - create and broadcast a new tracking update
router.post('/', (req, res, next) => {
  const io = req.app.get('io');
  return postTrackingUpdate(io)(req, res, next);
});

// GET /api/v1/tracking/:packageId - get tracking history for a package
router.get('/:packageId', getTracking);

export const TrackingRoutes = router;
