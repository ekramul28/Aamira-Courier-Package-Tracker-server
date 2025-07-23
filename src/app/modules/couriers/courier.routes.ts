import express from 'express';
import { postCourierLocation } from './courier.controller';
const router = express.Router();

router.post('/location', postCourierLocation);

export const CourierRoutes = router;
