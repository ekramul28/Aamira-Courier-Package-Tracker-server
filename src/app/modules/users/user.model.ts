import { Schema, model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: 'courier' | 'dispatcher' | 'system';
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['courier', 'dispatcher', 'system'],
    required: true,
  },
});

export const User = model<IUser>('User', userSchema);
