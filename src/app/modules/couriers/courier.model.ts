import { Schema, model, Types } from 'mongoose';

export interface ICourier {
  id: string;
  user: Types.ObjectId;
  name: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
}

const courierSchema = new Schema<ICourier>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  name: { type: String, required: true },
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

courierSchema.statics.isUserExists = async function (id: string) {
  return await Courier.findOne({ id });
};

export const Courier = model<ICourier>('Courier', courierSchema);
