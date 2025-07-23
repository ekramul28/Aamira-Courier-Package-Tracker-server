import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import {
  getAllCouriers,
  getSingleCourier,
  updateCourier,
  deleteCourier,
} from './courier.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.dispatcher), getAllCouriers);
router.get('/:id', auth(USER_ROLE.dispatcher), getSingleCourier);
router.patch('/:id', auth(USER_ROLE.admin), updateCourier);
router.delete('/:id', auth(USER_ROLE.admin), deleteCourier);

export const CourierRoutes = router;
