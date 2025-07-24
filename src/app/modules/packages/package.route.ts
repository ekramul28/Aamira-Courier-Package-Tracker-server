import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { PackageControllers } from './package.controller';
import {
  createPackageValidationSchema,
  updatePackageValidationSchema,
} from './package.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.dispatcher),
  validateRequest(createPackageValidationSchema),
  PackageControllers.createPackage,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.dispatcher,
    USER_ROLE.courier,
  ),
  PackageControllers.getAllPackages,
);

router.get(
  '/:packageId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.dispatcher,
    USER_ROLE.courier,
  ),
  PackageControllers.getSinglePackage,
);

router.patch(
  '/:packageId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.dispatcher),
  validateRequest(updatePackageValidationSchema),
  PackageControllers.updatePackage,
);

router.delete(
  '/:packageId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  PackageControllers.deletePackage,
);

export const PackageRoutes = router;
