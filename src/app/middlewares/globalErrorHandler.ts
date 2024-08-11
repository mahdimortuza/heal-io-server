/* eslint-disable @typescript-eslint/no-unused-vars */

import express, { Application, ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import config from '../config';
import { TErrorSource } from '../interface/error';
const app: Application = express();

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // default values for error
  let statusCode = 500;
  let message = err.message || 'Something went wrong!';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;

    return {
      statusCode,
      message: 'Validation error.',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_DEV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
