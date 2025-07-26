import { Schema, model } from 'mongoose';

export interface ICourier {
  name: string;
  email: string;
  password: string;
  role: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
}

const courierSchema = new Schema<ICourier>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'courier' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Courier = model<ICourier>('Courier', courierSchema);
