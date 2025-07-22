import { Schema, model, Types } from 'mongoose';

export interface IEvent {
  packageId: string;
  type: string;
  status: string;
  lat?: number;
  lon?: number;
  eventTimestamp: Date;
  receivedAt: Date;
  note?: string;
  eta?: Date;
}

const eventSchema = new Schema<IEvent>({
  packageId: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  lat: Number,
  lon: Number,
  eventTimestamp: { type: Date, required: true },
  receivedAt: { type: Date, required: true },
  note: String,
  eta: Date,
});

export const Event = model<IEvent>('Event', eventSchema);
