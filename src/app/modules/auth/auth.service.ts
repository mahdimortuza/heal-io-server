import httpStatus from 'http-status';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if user exists

  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user does not exist.');
  }
  // checking if user exists
  const isUserDeleted = user?.isDeleted;

  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.');
  }

  // checking if  the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password did not match.');

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// const refreshToken = async (token: string) => {};

export const AuthServices = {
  loginUser,
  // refreshToken,
};
