import express from 'express';
import { TrackingControllers } from './tracking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { io } from '../../../sockets';

const router = express.Router();

// POST /api/v1/tracking - create and broadcast a new tracking update
router.post(
  '/',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.customer),
  (req, res, next) => {
    // const io = req.app.get('io');
    const socketio = io;
    // console.log('this is req.app', req.app);
    // // console.log('this is io', io);
    return TrackingControllers.postTrackingUpdate(socketio)(req, res, next);
  },
);

// GET /api/v1/tracking/:packageId - get tracking history for a package
router.get(
  '/:packageId',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.customer),
  TrackingControllers.getTracking,
);

export const TrackingRoutes = router;
