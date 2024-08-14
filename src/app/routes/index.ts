import { Router } from 'express';
import { LoginRoutes } from '../modules/auth/auth.route';
import { CategoryRoutes } from '../modules/category/categoty.route';
import { UserRoute } from '../modules/user/user.route';
import { VariantRoutes } from '../modules/variants/variant.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: LoginRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/variant',
    route: VariantRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
