import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Courier } from './courier.model';

export const getAllCouriersFromDB = async (query: Record<string, unknown>) => {
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

export const getSingleCourierFromDB = async (id: string) => {
  const result = await Courier.findById(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Courier not found');
  return result;
};

export const updateCourierIntoDB = async (
  id: string,
  payload: Partial<any>,
) => {
  const result = await Courier.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Courier not found');
  return result;
};

export const deleteCourierFromDB = async (id: string) => {
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
};
