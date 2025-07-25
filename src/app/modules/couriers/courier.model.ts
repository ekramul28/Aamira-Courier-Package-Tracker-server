import { Schema, model, Types } from 'mongoose';

export interface ICourier {
  name: string;
  email: string;
  password: string;
  role: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
}

const courierSchema = new Schema<ICourier>({
  // id: { type: String, required: true, unique: true },

  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, required: true, default: 'courier' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  isDeleted: { type: Boolean, default: false },
});

courierSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
courierSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
courierSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Courier = model<ICourier>('Courier', courierSchema);
