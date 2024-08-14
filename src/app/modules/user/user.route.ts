import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from './user.constants';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();

// as vercel server dose not  allow to host files so, route to create user with image

// router.post(
//   '/create-user',
//   auth(USER_ROLE.admin, USER_ROLE.superAdmin),
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   },
//   validateRequest(UserValidations.createUserValidationSchema),
//   UserControllers.createUser,
// );

router.post(
  '/create-user',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/', auth(USER_ROLE.user), UserControllers.getAllUsers);
router.get('/:id', auth(USER_ROLE.admin), UserControllers.getSingleUser);
router.patch('/:id', auth(USER_ROLE.admin), UserControllers.updateSingleUser);
router.delete('/:id', auth(USER_ROLE.admin), UserControllers.deleteSingleUser);

router.get(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getMe,
);

export const UserRoute = router;
