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
