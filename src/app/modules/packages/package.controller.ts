import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { createOrUpdatePackage, getPackageById } from './package.service';

export const postPackageUpdate = catchAsync(async (req, res) => {
  const result = await createOrUpdatePackage(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Package state updated',
    data: result,
  });
});

export const getPackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const result = await getPackageById(packageId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Package fetched',
    data: result,
  });
});
