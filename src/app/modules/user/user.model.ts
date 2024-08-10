import bcrypt from 'bcrypt';
import { model, Model, Schema } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser, UserModel>({
  name: { type: String, required: [true, 'User name is required'], trim: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating static to check if the user exists
userSchema.statics.isUserExists = async function (email: string) {
  const existingUser = await User.findOne({ email });
  return existingUser;
};
interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
}

export const User = model<TUser, UserModel>('User', userSchema);
