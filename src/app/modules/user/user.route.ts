import express from 'express';
import auth from '../../middlewares/auth';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  // validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/', auth(), UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', UserControllers.updateSingleUser);
router.delete('/:id', UserControllers.deleteSingleUser);

export const UserRoute = router;
