/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Courier } from './courier.model';
import { User } from '../User/user.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCourierIntoDB = async (payload: any) => {
  payload.role = 'courier';
  console.log('inservice', payload);
  const isUserExists = await User.findOne({ email: payload.email });
  if (isUserExists)
    throw new AppError(httpStatus.BAD_REQUEST, 'Courier already exists');

  const result = await Courier.create(payload);
  return result;
};
const getAllCouriersFromDB = async (query: Record<string, unknown>) => {
  const courierQuery = new QueryBuilder(Courier.find(), query)
    .search(['name', 'id'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courierQuery.modelQuery;
  const meta = await courierQuery.countTotal();
  return { result, meta };
};

const getSingleCourierFromDB = async (id: string) => {
  const result = await Courier.findById(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Courier not found');
  return result;
};

const updateCourierIntoDB = async (id: string, payload: Partial<any>) => {
  const result = await Courier.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Courier not found');
  return result;
};

const deleteCourierFromDB = async (id: string) => {
  const result = await Courier.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Courier not found');
  return result;
};

export const CourierServices = {
  getAllCouriersFromDB,
  getSingleCourierFromDB,
  updateCourierIntoDB,
  deleteCourierFromDB,
  createCourierIntoDB,
};
