import { Request, Response } from 'express';
import { CreateUserDto, CreateUserSchema } from '../validators/user.schema';
import { createUser, deleteUser, getUserById, getUsers } from '../services/user.service';

export async function handleCreateUser(req: Request, res: Response): Promise<void> {
  const dto = req.body as CreateUserDto;
  const user = await createUser(dto);
  res.status(201).json(user);
}

export async function handleGetUsers(_: Request, res: Response): Promise<void> {
  const users = await getUsers();
  res.status(200).json({
    users
  });
}

export async function handleGetUserById(req: Request, res: Response): Promise<void> {
  const userId = req.params.id;
  const user = await getUserById(userId);

  if (!user) {
    res.status(404).json({
      error: 'User not found',
      message: `User with ID ${userId} does not exist.`,
      status: 404,
      timestamp: new Date().valueOf()
    });
    return;
  }

  res.status(200).json(user);
}

export async function handleDeleteUser(req: Request, res: Response): Promise<void> {
  const userId = req.params.id;
  try {
    const deleted = await deleteUser(userId);
    res.json(deleted);
  } catch (err) {
    res.status(404).json({ error: 'User not found' });
  }
}
