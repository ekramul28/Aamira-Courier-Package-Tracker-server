import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const updateLocation = catchAsync(async (req, res) => {
  // Implement location update logic here
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Location update received',
    data: {},
  });
});
