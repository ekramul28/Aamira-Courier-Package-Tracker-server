import express from 'express';
import { getDashboard } from './dispatcher.controller';
const router = express.Router();

router.get('/dashboard', getDashboard);

export const DispatcherRoutes = router;
