import express, { type Router } from 'express';
import userRoutes from './user.route';

const router = express.Router();
interface IRoute {
  path: string;
  route: Router;
}

const routes: IRoute[] = [
  {
    path: '/users',
    route: userRoutes,
  },
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
