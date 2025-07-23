import { io } from '../../../sockets';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { getUserNotifications, sendNotification } from './notification.service';

const getNotifications = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const notifications = await getUserNotifications(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notifications fetched successfully',
    data: notifications,
  });
});

const postNotification = catchAsync(async (req, res) => {
  const { userId, message } = req.body;
  const io2 = io;
  const notification = await sendNotification(io2, userId, message);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Notification sent successfully',
    data: notification,
  });
});

export const NotificationControllers = {
  getNotifications,
  postNotification,
};
