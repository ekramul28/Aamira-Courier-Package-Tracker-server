import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { getUserNotifications } from './notification.service';

export const getNotifications = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const notifications = await getUserNotifications(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Notifications fetched successfully',
    data: notifications,
  });
});
