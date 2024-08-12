import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constants';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  auth(USER_ROLE.admin),
  // validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get('/:id', auth(USER_ROLE.admin), UserControllers.getSingleUser);
router.patch('/:id', auth(USER_ROLE.admin), UserControllers.updateSingleUser);
router.delete('/:id', auth(USER_ROLE.admin), UserControllers.deleteSingleUser);

export const UserRoute = router;
