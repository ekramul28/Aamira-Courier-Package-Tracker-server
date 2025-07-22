import { Event } from './event.model';
import { Server } from 'socket.io';
import { EVENT_TYPES } from './event.constant';

export const createEvent = async (io: Server, eventData: any) => {
  // Save event to DB
  const event = await Event.create({
    ...eventData,
    receivedAt: new Date(),
  });
  // Emit event to all clients
  io.emit(EVENT_TYPES.PACKAGE_UPDATE, event);
  return event;
};

export const getPackageEvents = async (packageId: string) => {
  return Event.find({ packageId }).sort({ eventTimestamp: 1 });
};
