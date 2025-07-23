import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import {
  getAllDispatchers,
  getSingleDispatcher,
  updateDispatcher,
  deleteDispatcher,
} from './dispatcher.controller';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), getAllDispatchers);
router.get('/:id', auth(USER_ROLE.admin), getSingleDispatcher);
router.patch('/:id', auth(USER_ROLE.admin), updateDispatcher);
router.delete('/:id', auth(USER_ROLE.admin), deleteDispatcher);

export const DispatcherRoutes = router;
