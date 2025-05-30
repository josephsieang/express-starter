import { Request, Response } from 'express';
import { getGreeting } from '../services/hello.service';

export function sayHello(req: Request, res: Response): void {
  const message = getGreeting();
  res.json({ message });
}
