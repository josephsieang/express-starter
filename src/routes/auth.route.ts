import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { RegisterSchema } from '../validators/register.schema';
import { handleRegisterUser } from '../controllers/auth.controller';

const router = Router();

router.post('/register', validate(RegisterSchema), handleRegisterUser);

export default router;
