import { User } from '@prisma/client';
import { UserLoginPayload, UserRegisterPayload } from '../models/user';
import { prisma } from '../lib/prisma';

export async function registerUser(userData: UserRegisterPayload): Promise<User> {
  return prisma.user.create({
    data: { name: userData.name, email: userData.email, password: userData.password }
  });
}

export async function login(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email }
  });
}
