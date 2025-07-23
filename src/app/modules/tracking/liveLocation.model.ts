import { Schema, model, Types } from 'mongoose';

export interface ILiveLocation {
  user: Types.ObjectId; // Reference to User (courier)
  lat: number;
  lon: number;
  timestamp: Date;
  packageId?: string; // Optional: current package being handled
}

const liveLocationSchema = new Schema<ILiveLocation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  packageId: { type: String },
});

export const LiveLocation = model<ILiveLocation>(
  'LiveLocation',
  liveLocationSchema,
);
