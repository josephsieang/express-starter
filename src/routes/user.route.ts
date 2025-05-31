import { Router } from 'express';
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUsers
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { CreateUserSchema, UserIdParamsSchema } from '../validators/user.schema';

const router = Router();

router.post('/', validate(CreateUserSchema), handleCreateUser);
router.get('/', handleGetUsers);
router.get('/:id', validate(UserIdParamsSchema, 'params'), handleGetUserById);
router.delete('/:id', validate(UserIdParamsSchema, 'params'), handleDeleteUser);

export default router;
