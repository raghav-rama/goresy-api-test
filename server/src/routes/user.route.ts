import express, { type Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
} from '../controllers/user.controller';

const router: Router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUserById);
router.route('/').post(createUser);
router.route('/:id').patch(updateUser);

export default router;
