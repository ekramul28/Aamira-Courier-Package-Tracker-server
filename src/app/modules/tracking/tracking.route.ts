import express from 'express';
import { TrackingControllers } from './tracking.controller';
import { io } from '../../../sockets';

const router = express.Router();

// POST /api/v1/tracking - create and broadcast a new tracking update
router.post('/', (req, res, next) => {
  const socketio = io;
  return TrackingControllers.postTrackingUpdate(socketio)(req, res, next);
});

// GET /api/v1/tracking/:packageId - get tracking history for a package
router.get('/:packageId', TrackingControllers.getTracking);

// GET /api/v1/tracking/active - get all active packages for dispatcher dashboard
router.get('/active', TrackingControllers.getActivePackagesController);

export const TrackingRoutes = router;
