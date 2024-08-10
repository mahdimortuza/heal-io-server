import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
  name: { type: String, required: [true, 'User name is required'], trim: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
});

export const User = model<TUser>('User', userSchema);
