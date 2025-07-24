import { Package } from './package.model';
import { IPackage } from './package.interface';
import QueryBuilder from '../../builder/QueryBuilder';

const PackageSearchableFields = [
  'packageName',
  'packageDescription',
  'packageId',
];

const createPackage = async (data: IPackage) => {
  return Package.create(data);
};

const getAllPackages = async (query: Record<string, unknown>) => {
  const packageQuery = new QueryBuilder(Package.find(), query)
    .search(PackageSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await packageQuery.modelQuery;
  const meta = await packageQuery.countTotal();
  return {
    result,
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
