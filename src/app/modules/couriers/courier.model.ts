import { Schema, model, Types } from 'mongoose';

export interface ICourier {
  user: Types.ObjectId; // Reference to User
  // Add more courier-specific fields if needed
}

const courierSchema = new Schema<ICourier>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // Add more fields here
});

export const Courier = model<ICourier>('Courier', courierSchema);
