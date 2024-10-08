import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';

interface CustomRequest extends Request {
  user: JwtPayload;
}

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // checks if the token is missing
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // if token is valid
      jwt.verify(
        token,
        config.jwt_access_secret as string,

        function (err, decoded) {
          // err
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized!',
            );
          }
          // decoded undefined

          const role = (decoded as JwtPayload).role;

          if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized!',
            );
          }

          req.user = decoded as JwtPayload;
          next();
        },
      );
    },
  );
};
export default auth;
