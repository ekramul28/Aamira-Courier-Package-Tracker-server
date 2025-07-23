import { User } from './user.model';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

type UserObj = Omit<IUser, 'password'> & { password?: string };

export const registerUserService = async (userData: IUser) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }
  const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
  const user = await User.create({
    ...userData,
    password: hashedPassword,
  });
  const userObj: UserObj = user.toObject();
  if (userObj.password) delete userObj.password;
  return userObj;
};

export const loginUserService = async (credentials: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const isMatch = await bcrypt.compare(credentials.password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwt_access_secret as string,
    { expiresIn: '1d' },
  );
  const userObj: UserObj = user.toObject();
  if (userObj.password) delete userObj.password;
  return { user: userObj, token };
};

export const getUserByIdService = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

export const updateUserProfileService = async (
  userId: string,
  update: Partial<IUser>,
) => {
  if (update.password) {
    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    update.password = await bcrypt.hash(update.password, saltRounds);
  }
  const user = await User.findByIdAndUpdate(userId, update, {
    new: true,
  }).select('-password');
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};
