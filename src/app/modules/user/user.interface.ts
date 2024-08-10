import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  photo?: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser | null>;
}
