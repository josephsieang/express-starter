import { Prisma, User } from '@prisma/client';
import { prisma } from '../lib/prisma';

export async function createUser(user: Prisma.UserCreateInput): Promise<User> {
  return prisma.user.create({ data: user });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: Number(id) }
  });
}

export async function deleteUser(id: string): Promise<User> {
  return prisma.user.delete({
    where: { id: Number(id) }
  });
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  return prisma.user.update({
    where: { id: Number(id) },
    data: userData
  });
}
