import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import { CategoryControllers } from './categoty.controller';
import { CategoryValidations } from './categoty.validation';

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
  '/create-category',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CategoryControllers.getAllCategories,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin),
  CategoryControllers.getSingleCategory,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  CategoryControllers.updateSingleCategory,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  CategoryControllers.deleteSingleCategory,
);

export const CategoryRoutes = router;
