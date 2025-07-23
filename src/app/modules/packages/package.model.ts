import { Schema, model } from 'mongoose';

export type PackageStatus =
  | 'CREATED'
  | 'PICKED_UP'
  | 'IN_TRANSIT'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'EXCEPTION'
  | 'CANCELLED';

export interface IPackage {
  packageId: string;
  status: PackageStatus;
  lat?: number;
  lon?: number;
  eventTimestamp: Date;
  receivedAt: Date;
  note?: string;
  eta?: Date;
}

const packageSchema = new Schema<IPackage>({
  packageId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  lat: Number,
  lon: Number,
  eventTimestamp: { type: Date, required: true },
  receivedAt: { type: Date, required: true },
  note: String,
  eta: Date,
});

export const Package = model<IPackage>('Package', packageSchema);
