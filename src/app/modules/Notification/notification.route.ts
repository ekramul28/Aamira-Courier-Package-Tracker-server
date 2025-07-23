import express from 'express';
import { NotificationControllers } from './notification.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), NotificationControllers.getNotifications);
router.post('/', auth(), NotificationControllers.postNotification);

export const NotificationRoutes = router;
