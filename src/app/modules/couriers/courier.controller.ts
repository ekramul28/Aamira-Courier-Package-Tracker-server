import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourierServices } from './courier.service';

export const createCourier = catchAsync(async (req, res) => {
  const result = await CourierServices.createCourierIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier created successfully',
    data: result,
  });
});
export const getAllCouriers = catchAsync(async (req, res) => {
  const result = await CourierServices.getAllCouriersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Couriers retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const getSingleCourier = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourierServices.getSingleCourierFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier retrieved successfully',
    data: result,
  });
});

export const updateCourier = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { courier } = req.body;
  const result = await CourierServices.updateCourierIntoDB(id, courier);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier updated successfully',
    data: result,
  });
});

export const deleteCourier = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourierServices.deleteCourierFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courier deleted successfully',
    data: result,
  });
});
