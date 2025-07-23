import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  createTrackingUpdate,
  getTrackingHistory,
  getActivePackages,
} from './tracking.service';
import { Server } from 'socket.io';

const postTrackingUpdate = (io: Server) =>
  catchAsync(async (req, res) => {
    const trackingData = req.body;
    const update = await createTrackingUpdate(io, trackingData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Tracking update created and broadcasted',
      data: update,
    });
  });

const getTracking = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const history = await getTrackingHistory(packageId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Tracking history fetched successfully',
    data: history,
  });
});

const getActivePackagesController = catchAsync(async (req, res) => {
  const activePackages = await getActivePackages();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Active packages fetched successfully',
    data: activePackages,
  });
});

export const TrackingControllers = {
  postTrackingUpdate,
  getTracking,
  getActivePackagesController,
};
