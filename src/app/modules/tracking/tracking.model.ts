import { Schema, model } from 'mongoose';

export interface ITracking {
  packageId: string;
  status: string;
  lat?: number;
  lon?: number;
  timestamp: Date;
  eta?: Date;
  note?: string;
}

const trackingSchema = new Schema<ITracking>({
  packageId: { type: String, required: true },
  status: { type: String, required: true },
  lat: Number,
  lon: Number,
  timestamp: { type: Date, required: true },
  eta: Date,
  note: String,
});

export const Tracking = model<ITracking>('Tracking', trackingSchema);
