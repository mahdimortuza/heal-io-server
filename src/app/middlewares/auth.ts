import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import catchAsync from '../utils/catchAsync';

interface CustomRequest extends Request {
  user: JwtPayload;
}

const auth = () => {
  return catchAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // checks if the token is sent from client
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

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
          req.user = decoded as JwtPayload;
          next();
        },
      );
    },
  );
};
export default auth;
