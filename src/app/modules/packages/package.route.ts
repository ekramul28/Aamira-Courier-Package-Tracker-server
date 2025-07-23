import express from 'express';
import { postPackageUpdate, getPackage } from './package.controller';
const router = express.Router();

router.post('/', postPackageUpdate);
router.get('/:packageId', getPackage);

export const PackageRoutes = router;
