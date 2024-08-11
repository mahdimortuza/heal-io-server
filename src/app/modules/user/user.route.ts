import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  // validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/', UserControllers.getAllUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', UserControllers.updateSingleUser);
router.delete('/:id', UserControllers.deleteSingleUser);

export const UserRoute = router;
