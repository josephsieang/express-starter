import { NextFunction, Request, Response } from 'express';
import { comparePassword, hashPassword, signToken } from '../lib/auth';
import { login, registerUser } from '../services/auth.service';
import { ApiError } from '../utils/api-error';
import { isPrismaUniqueConstraintError } from '../utils/prisma-error';

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
    res.status(201).json({ name, email, id: user.id });
  } catch (err) {
    if (isPrismaUniqueConstraintError(err)) {
      return next(new ApiError('UserAlreadyExists', 'Email already exists.', 409));
    }
    next(
      new ApiError('RegisterUserError', err instanceof Error ? err.message : 'Unknown error', 500)
    );
  }
}

export async function handleLoginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await login(email);

    if (!user || !(await comparePassword(password, user.password || ''))) {
      return next(new ApiError('InvalidCredentials', 'Email or password is incorrect.', 401));
    }

    const token = signToken(user.id, user.role);
    res.json({ token, email });
  } catch (err) {
    next(new ApiError('LoginUserError', err instanceof Error ? err.message : 'Unknown error', 500));
  }
}
