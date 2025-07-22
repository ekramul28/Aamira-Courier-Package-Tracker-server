import express from 'express';
import { getNotifications } from './notification.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), getNotifications);

export const NotificationRoutes = router;
