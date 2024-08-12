import { Model } from 'mongoose';

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
