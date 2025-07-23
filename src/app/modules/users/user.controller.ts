import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const registerUser = catchAsync(async (req, res) => {
  // Implement registration logic
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered',
    data: {},
  });
});

export const loginUser = catchAsync(async (req, res) => {
  // Implement login logic
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in',
    data: {},
  });
});
