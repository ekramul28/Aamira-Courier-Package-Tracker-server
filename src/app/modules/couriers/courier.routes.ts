import express from 'express';
import auth from '../../middlewares/auth';

import {
  getAllCouriers,
  getSingleCourier,
  updateCourier,
  deleteCourier,
  createCourier,
  getMyPackage,
} from './courier.controller';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.dispatcher, USER_ROLE.superAdmin),
  createCourier,
);
router.get(
  '/packages/:id',
  auth(USER_ROLE.dispatcher, USER_ROLE.superAdmin, USER_ROLE.courier),
  getMyPackage,
);
router.get(
  '/',
  auth(USER_ROLE.dispatcher, USER_ROLE.superAdmin),
  getAllCouriers,
);
router.get(
  '/:id',
  auth(USER_ROLE.dispatcher, USER_ROLE.superAdmin),
  getSingleCourier,
);
router.patch(
  '/:id',
  auth(USER_ROLE.dispatcher, USER_ROLE.superAdmin),
  updateCourier,
);
router.delete(
  '/:id',
  auth(USER_ROLE.dispatcher, USER_ROLE.superAdmin),
  deleteCourier,
);

export const CourierRoutes = router;
