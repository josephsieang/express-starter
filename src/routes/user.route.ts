import { Router } from 'express';
import { handleCreateUser, handleGetUsers } from '../controllers/user.controller';

const router = Router();

router.post('/', handleCreateUser);
router.get('/', handleGetUsers);

export default router;
