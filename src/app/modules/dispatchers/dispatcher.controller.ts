import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DispatcherServices } from './dispatcher.service';

export const getAllDispatchers = catchAsync(async (req, res) => {
  const result = await DispatcherServices.getAllDispatchersFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dispatchers retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

export const getSingleDispatcher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DispatcherServices.getSingleDispatcherFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dispatcher retrieved successfully',
    data: result,
  });
});

export const updateDispatcher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { dispatcher } = req.body;
  const result = await DispatcherServices.updateDispatcherIntoDB(
    id,
    dispatcher,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dispatcher updated successfully',
    data: result,
  });
});

export const deleteDispatcher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DispatcherServices.deleteDispatcherFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Dispatcher deleted successfully',
    data: result,
  });
});
