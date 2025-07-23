import { Package } from './package.model';

export const createOrUpdatePackage = async (data) => {
  // Idempotent upsert logic for package state
  return Package.findOneAndUpdate(
    { packageId: data.packageId },
    { ...data },
    { upsert: true, new: true },
  );
};

export const getPackageById = async (packageId) => {
  return Package.findOne({ packageId });
};
