import { Package } from './package.model';
import { IPackage } from './package.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { generatePackageId } from './package.utils';
import mongoose from 'mongoose';

const PackageSearchableFields = [
  'packageName',
  'packageDescription',
  'packageId',
];

const createPackage = async (data: IPackage) => {
  console.log('data', data);

  const packageId = await generatePackageId();

  const packageData = {
    ...data,
    packageId,
    courier_id: new mongoose.Types.ObjectId(
      data.courier_id as unknown as string,
    ),
  };

  console.log('packageData', packageData);

  const result = await Package.create(packageData);
  console.log('Saved Package:', result);

  return result;
};

const getAllPackages = async (query: Record<string, unknown>) => {
  const packageQuery = new QueryBuilder(Package.find(), query)
    .search(PackageSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await packageQuery.modelQuery;
  const meta = await packageQuery.countTotal();

  return {
    data,
    meta,
  };
};

const getPackageById = async (packageId: string) => {
  return Package.findOne({ packageId });
};

const updatePackage = async (packageId: string, data: Partial<IPackage>) => {
  return Package.findOneAndUpdate({ packageId }, data, { new: true });
};

const deletePackage = async (packageId: string) => {
  return Package.findOneAndDelete({ packageId });
};

export const PackageServices = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
