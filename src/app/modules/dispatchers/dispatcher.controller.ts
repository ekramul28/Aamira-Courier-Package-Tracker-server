import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const getDashboard = catchAsync(async (req, res) => {
  // Implement dashboard logic here
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Dashboard data fetched',
    data: {},
  });
});
