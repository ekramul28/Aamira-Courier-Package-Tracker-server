import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PackageServices } from './package.service';

const createPackage = catchAsync(async (req, res) => {
  console.log('req.body', req.body);
  const result = await PackageServices.createPackage(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Package created successfully',
    data: result,
  });
});

const getAllPackages = catchAsync(async (req, res) => {
  const result = await PackageServices.getAllPackages(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Packages retrieved successfully',
    data: result,
  });
});

const getSinglePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const result = await PackageServices.getPackageById(packageId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package retrieved successfully',
    data: result,
  });
});

const updatePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const result = await PackageServices.updatePackage(packageId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package updated successfully',
    data: result,
  });
});

const deletePackage = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const result = await PackageServices.deletePackage(packageId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Package deleted successfully',
    data: result,
  });
});

export const PackageControllers = {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
  deletePackage,
};
