import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { createEvent, getEventsByPackage } from './event.service';

export const postEvent = catchAsync(async (req, res) => {
  const result = await createEvent(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Event created',
    data: result,
  });
});

export const getEvents = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const result = await getEventsByPackage(packageId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Events fetched',
    data: result,
  });
});
