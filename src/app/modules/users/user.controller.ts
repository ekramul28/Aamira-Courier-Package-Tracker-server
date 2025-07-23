import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { registerUserService, loginUserService } from './user.service';

export const registerUser = catchAsync(async (req, res) => {
  const user = await registerUserService(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered',
    data: user,
  });
});

export const loginUser = catchAsync(async (req, res) => {
  const { user, token } = await loginUserService(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in',
    data: { user, token },
  });
});
