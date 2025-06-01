import { Request, Response, NextFunction } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from '../services/user.service';
import { ApiError } from '../utils/api-error';
import { User } from '@prisma/client';
import { omitFields, omitFieldsFromArray } from '../utils/omit-fields';
import { isPrismaUniqueConstraintError } from '../utils/prisma-error';

export async function handleCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const dto = req.body as User;
    const user = await createUser(dto);
    res.status(201).json(omitFields(user, ['password']));
  } catch (err) {
    next(
      new ApiError('CreateUserError', err instanceof Error ? err.message : 'Unknown error', 500)
    );
  }
}

export async function handleGetUsers(_: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await getUsers();
    res.status(200).json({ users: omitFieldsFromArray(users, ['password']) });
  } catch (err) {
    next(new ApiError('GetUsersError', err instanceof Error ? err.message : 'Unknown error', 500));
  }
}

export async function handleGetUserById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.params.id;
    const user = await getUserById(userId);
    if (!user) {
      return next(new ApiError('UserNotFound', `User with ID ${userId} does not exist.`, 404));
    }
    res.status(200).json(omitFields(user, ['password']));
  } catch (err) {
    next(
      new ApiError('GetUserByIdError', err instanceof Error ? err.message : 'Unknown error', 500)
    );
  }
}

export async function handleDeleteUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.id;
  try {
    const deleted = await deleteUser(userId);
    res.json(omitFields(deleted, ['password']));
  } catch (err) {
    next(new ApiError('UserNotFound', `User with ID ${userId} does not exist.`, 404));
  }
}

export async function handleUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const userId = req.params.id;
  const userData = req.body as Partial<User>;

  try {
    const updatedUser = await updateUser(userId, userData);
    res.status(200).json(omitFields(updatedUser, ['password']));
  } catch (err) {
    if (isPrismaUniqueConstraintError(err)) {
      next(new ApiError('UserAlreadyExists', 'Email already exists.', 409));
    } else {
    next(new ApiError('UserNotFound', `User with ID ${userId} does not exist.`, 404));
}
  }
}
