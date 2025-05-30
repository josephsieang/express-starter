import { Request, Response } from 'express';
import { CreateUserSchema } from '../validators/user.schema';
import { createUser, getUsers } from '../services/user.service';

export async function handleCreateUser(req: Request, res: Response): Promise<void> {
  const parse = CreateUserSchema.safeParse(req.body);
  if (!parse.success) {
    res.status(400).json({ error: parse.error.errors });
    return;
  }

  const user = await createUser(parse.data);
  res.status(201).json(user);
}

export async function handleGetUsers(_: Request, res: Response): Promise<void> {
  const users = await getUsers();
  res.status(200).json({
    users
  });
}
