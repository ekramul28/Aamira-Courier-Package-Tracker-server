/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
// import { Dispatcher } from './dispatcher.model'; // Uncomment if you have a Dispatcher model

// Placeholder: Replace with your Dispatcher model
const Dispatcher = {} as any;

export const getAllDispatchersFromDB = async (
  query: Record<string, unknown>,
) => {
  const dispatcherQuery = new QueryBuilder(Dispatcher.find(), query)
    .search(['name', 'id'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await dispatcherQuery.modelQuery;
  const meta = await dispatcherQuery.countTotal();
  return { result, meta };
};

export const getSingleDispatcherFromDB = async (id: string) => {
  const result = await Dispatcher.findById(id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Dispatcher not found');
  return result;
};

export const updateDispatcherIntoDB = async (
  id: string,
  payload: Partial<any>,
) => {
  const result = await Dispatcher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Dispatcher not found');
  return result;
};

export const deleteDispatcherFromDB = async (id: string) => {
  const result = await Dispatcher.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Dispatcher not found');
  return result;
};

export const DispatcherServices = {
  getAllDispatchersFromDB,
  getSingleDispatcherFromDB,
  updateDispatcherIntoDB,
  deleteDispatcherFromDB,
};
