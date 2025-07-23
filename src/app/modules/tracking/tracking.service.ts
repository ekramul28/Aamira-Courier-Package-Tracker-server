/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tracking } from './tracking.model';
import { Server } from 'socket.io';
import { TRACKING_EVENTS } from './tracking.constant';

export const createTrackingUpdate = async (io: Server, trackingData: any) => {
  // Save tracking update to DB
  const update = await Tracking.create(trackingData);
  // Emit update to all clients
  io.emit(TRACKING_EVENTS.LOCATION_UPDATE, update);
  return update;
};

export const getTrackingHistory = async (packageId: string) => {
  return Tracking.find({ packageId }).sort({ timestamp: 1 });
};

// Get the latest state for each package (for dashboard)
export const getLatestPackageStates = async () => {
  // Aggregate to get the latest tracking doc per packageId
  return Tracking.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: '$packageId',
        packageId: { $first: '$packageId' },
        status: { $first: '$status' },
        lat: { $first: '$lat' },
        lon: { $first: '$lon' },
        timestamp: { $first: '$timestamp' },
        eta: { $first: '$eta' },
        note: { $first: '$note' },
      },
    },
    { $replaceRoot: { newRoot: '$$ROOT' } },
  ]);
};

// Get all active packages (not DELIVERED/CANCELLED) seen in the last 24 hours
export const getActivePackages = async () => {
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return Tracking.aggregate([
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: '$packageId',
        packageId: { $first: '$packageId' },
        status: { $first: '$status' },
        lat: { $first: '$lat' },
        lon: { $first: '$lon' },
        timestamp: { $first: '$timestamp' },
        eta: { $first: '$eta' },
        note: { $first: '$note' },
      },
    },
    {
      $match: {
        status: { $nin: ['DELIVERED', 'CANCELLED'] },
        timestamp: { $gte: since },
      },
    },
    { $replaceRoot: { newRoot: '$$ROOT' } },
  ]);
};
