import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const getDashboardData = catchAsync(async (req, res) => {
  // Implement dashboard aggregation logic here
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dispatcher dashboard data fetched',
    data: {},
  });
});
