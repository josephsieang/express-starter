import { Router } from 'express';
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUsers
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { CreateUserSchema } from '../validators/user.schema';

const router = Router();

router.post('/', validate(CreateUserSchema), handleCreateUser);
router.get('/', handleGetUsers);
router.get('/:id', handleGetUserById);
router.delete('/:id', handleDeleteUser);

export default router;
