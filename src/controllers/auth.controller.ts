import { NextFunction, Request, Response } from 'express';
import { hashPassword } from '../lib/auth';
import { registerUser } from '../services/auth.service';
import { ApiError } from '../utils/api-error';

export async function handleRegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    const user = await registerUser({
      name,
      email,
      password: hashed
    });
    res.status(201).json(user);
  } catch (err) {
    next(
      new ApiError('RegisterUserError', err instanceof Error ? err.message : 'Unknown error', 500)
    );
  }
}
