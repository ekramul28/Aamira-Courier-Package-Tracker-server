import express from 'express';
import { updateLocation } from './courier.controller';
const router = express.Router();

router.post('/location', updateLocation);

export const CourierRoutes = router;
