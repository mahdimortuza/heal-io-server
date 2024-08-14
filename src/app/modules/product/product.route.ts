import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get('/', ProductControllers.getAllProducts);
router.get('/:id', ProductControllers.getSingleProduct);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  ProductControllers.updateSingleProduct,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  ProductControllers.deleteSingleProduct,
);

export const ProductRoutes = router;
