import { Schema, model } from 'mongoose';

export interface IAlert {
  packageId: string;
  status: string;
  lastEventTimestamp: Date;
  alertTimestamp: Date;
  message: string;
}

const alertSchema = new Schema<IAlert>({
  packageId: { type: String, required: true },
  status: { type: String, required: true },
  lastEventTimestamp: { type: Date, required: true },
  alertTimestamp: { type: Date, required: true },
  message: { type: String, required: true },
});

export const Alert = model<IAlert>('Alert', alertSchema);
