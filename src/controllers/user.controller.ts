import { Request, Response } from 'express';
import { CreateUserDto, CreateUserSchema } from '../validators/user.schema';
import { createUser, getUsers } from '../services/user.service';

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
