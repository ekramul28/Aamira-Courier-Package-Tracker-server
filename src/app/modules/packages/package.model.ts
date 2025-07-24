import { Schema, model } from 'mongoose';
import { IPackage } from './package.interface';

const packageSchema = new Schema<IPackage>(
  {
    orderer_name: { type: String, required: true, index: true },
    home_address: { type: String, required: true },
    phone_number: { type: String, required: true },
    status: { type: String, required: true, default: 'CREATED', index: true },
    lat: { type: Number, default: 0 },
    lon: { type: Number, default: 0 },
    eventTimestamp: { type: Date, default: null },
    receivedAt: { type: Date, default: null },
    note: { type: String, default: null },
    eta: { type: Date, default: null },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Example: Compound index for frequent queries (optional)
// packageSchema.index({ status: 1, orderer_name: 1 });

export const Package = model<IPackage>('Package', packageSchema);
