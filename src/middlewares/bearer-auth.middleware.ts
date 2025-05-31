import { NextFunction, Request, Response } from 'express';
import { BEARER_TOKEN } from '../config/env';

export function bearerAuthHandler(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Authorization header is missing' });
    return;
  }

  const [type, credentials] = authHeader.split(' ');
  if (type !== 'Bearer' || !credentials) {
    res.status(401).json({ error: 'Invalid authorization format' });
    return;
  }

  const validToken = BEARER_TOKEN;
  if (credentials !== validToken) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  next();
}
