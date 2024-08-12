import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidation),
  AuthControllers.loginUser,
);

// router.post(
//   '/refresh-token',
//   validateRequest(AuthValidation.refreshTokenValidation),
//   AuthControllers.refreshToken,
// );

export const LoginRoutes = router;
