import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../user/user.constants';
import { VariantControllers } from './variant.controller';
import { VariantValidations } from './variant.validation';

const router = express.Router();

router.post(
  '/create-variant',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),

  validateRequest(VariantValidations.createVariantValidationSchema),
  VariantControllers.createVariant,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  VariantControllers.getAllVariants,
);
router.get('/:id', auth(USER_ROLE.admin), VariantControllers.getSingleVariant);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  VariantControllers.updateSingleVariant,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  VariantControllers.deleteSingleVariant,
);

export const VariantRoutes = router;
