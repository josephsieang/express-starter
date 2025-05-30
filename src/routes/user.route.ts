import { Router } from 'express';
import { handleCreateUser, handleGetUsers } from '../controllers/user.controller';
import { validate } from '../middlewares/validate';
import { CreateUserSchema } from '../validators/user.schema';

const router = Router();

router.post('/', validate(CreateUserSchema), handleCreateUser);
router.get('/', handleGetUsers);

export default router;
