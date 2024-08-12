import { Model } from 'mongoose';
import { USER_ROLE } from './user.constants';

export interface TUser {
  name: string;
  email: string;
  password: string;
  photo?: string;
  isDeleted: boolean;
  role: 'user' | 'admin' | 'superAdmin';
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
