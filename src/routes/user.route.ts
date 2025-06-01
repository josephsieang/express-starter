import { Router } from 'express';
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserById,
  handleGetUsers,
  handleUpdateUser
} from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { CreateUserSchema, UserIdParamsSchema } from '../validators/user.schema';

const router = Router();

router.post('/', validate(CreateUserSchema), handleCreateUser);
router.get('/', handleGetUsers);
router.get('/:id', validate(UserIdParamsSchema, 'params'), handleGetUserById);
router.delete('/:id', validate(UserIdParamsSchema, 'params'), handleDeleteUser);
router.put(
  '/:id',
  validate(UserIdParamsSchema, 'params'),
  validate(CreateUserSchema, 'body'),
  handleUpdateUser
);

export default router;
