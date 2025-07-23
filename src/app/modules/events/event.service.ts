import { Event } from './event.model';

export const createEvent = async (data) => {
  return Event.create(data);
};

export const getEventsByPackage = async (packageId) => {
  return Event.find({ packageId }).sort({ eventTimestamp: 1 });
};
