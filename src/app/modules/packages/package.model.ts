import { Schema, model } from 'mongoose';
import { IPackage } from './package.interface';

const packageSchema = new Schema<IPackage>(
  {
    packageId: { type: String },
    orderer_name: { type: String, required: true },
    home_address: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, default: 'CREATED' },
    lat: { type: Number, default: 0 },
    lon: { type: Number, default: 0 },
    eventTimestamp: { type: Date, default: null },
    receivedAt: { type: Date, default: null },
    note: { type: String, default: null },
    eta: { type: Date, default: null },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  },
);

// Example: Compound index for frequent queries (optional)
// packageSchema.index({ status: 1, orderer_name: 1 });

export const Package = model<IPackage>('Package', packageSchema);
