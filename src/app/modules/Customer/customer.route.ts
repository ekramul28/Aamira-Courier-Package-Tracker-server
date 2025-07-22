import express from 'express';
import { CustomerControllers } from './customer.controller';

const router = express.Router();

router.get('/', CustomerControllers.getAllCustomers);
router.get('/:id', CustomerControllers.getSingleCustomer);
router.delete('/:id', CustomerControllers.deleteCustomer);

export const CustomerRoutes = router;
