import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { PackageRoutes } from '../modules/packages/package.route';

import { CourierRoutes } from '../modules/couriers/courier.routes';
import { DispatcherRoutes } from '../modules/dispatchers/dispatcher.routes';
import { AdminRoutes } from '../modules/Admin/admin.route';

// router is a middleware that is used to handle the request and response of the api
// moduleRoutes is an array of objects that contains the path and route of the api
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },

  {
    path: '/packages',
    route: PackageRoutes,
  },
  {
    path: '/dispatchers',
    route: DispatcherRoutes,
  },
  {
    path: '/couriers',
    route: CourierRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
