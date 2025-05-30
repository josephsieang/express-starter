import { Router } from 'express';
import { sayHello } from '../controllers/hello.controller';
import { bearerAuthHandler } from '../middlewares/bearer-auth.middleware';

const router = Router();

router.get('/', bearerAuthHandler, sayHello);

export default router;
