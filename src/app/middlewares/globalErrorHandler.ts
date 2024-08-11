/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Application, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
const app: Application = express();

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default values for error
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';

  type TErrorSource = {
    path: string | number;
    message: string;
  }[];

  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'ami error';
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};

export default globalErrorHandler;
