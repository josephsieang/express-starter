import { Router } from 'express';

const router = Router();

router.get('/error', (req, res) => {
  throw new Error('This is a test error!');
});

export default router;
