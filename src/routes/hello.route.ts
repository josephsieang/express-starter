import { Router } from 'express';
import { GREETING_NAME } from '../config/env';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: `Hello, ${GREETING_NAME}!` });
});

export default router;
