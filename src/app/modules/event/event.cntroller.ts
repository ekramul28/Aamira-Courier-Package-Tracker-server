import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { createEvent, getPackageEvents } from './event.service';
import { Server } from 'socket.io';

export const postEvent = (io: Server) =>
  catchAsync(async (req, res) => {
    const eventData = req.body;
    const event = await createEvent(io, eventData);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Event created and broadcasted',
      data: event,
    });
  });

export const getEvents = catchAsync(async (req, res) => {
  const { packageId } = req.params;
  const events = await getPackageEvents(packageId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Events fetched successfully',
    data: events,
  });
});
