import { Package } from './package.model';

// utils/generatePackageId.ts
export const generatePackageId = async () => {
  const date = new Date();
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, ''); // e.g., "20250723"

  // Count how many packages have been created today
  const todayStart = new Date(
    dateStr.slice(0, 4) + '-' + dateStr.slice(4, 6) + '-' + dateStr.slice(6, 8),
  );
  const todayEnd = new Date(todayStart);
  todayEnd.setDate(todayEnd.getDate() + 1);

  const packageCount = await Package.countDocuments({
    createdAt: { $gte: todayStart, $lt: todayEnd },
  });

  const paddedNumber = String(packageCount + 1).padStart(3, '0'); // e.g., 001, 002
  return `PKG-${dateStr}-${paddedNumber}`;
};
