import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const postCourierLocation = catchAsync(async (req, res) => {
  // Implement location update logic here
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courier location/status update received',
    data: {},
  });
});
