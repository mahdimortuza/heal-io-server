import { Router } from 'express';
import { LoginRoutes } from '../modules/auth/auth.route';
import { UserRoute } from '../modules/user/user.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
