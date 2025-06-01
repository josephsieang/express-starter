import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { LoginSchema, RegisterSchema } from '../validators/register.schema';
import { handleLoginUser, handleRegisterUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(RegisterSchema), handleRegisterUser);
router.post('/login', validate(LoginSchema), handleLoginUser);

export default router;
