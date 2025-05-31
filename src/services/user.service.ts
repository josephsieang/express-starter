import { prisma } from '../lib/prisma';
import { CreateUserDto } from '../validators/user.schema';

const users: CreateUserDto[] = [];

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
  return prisma.user.create({ data: user });
}

export async function getUsers(): Promise<CreateUserDto[]> {
  return prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getUserById(id: string): Promise<CreateUserDto | null> {
  return prisma.user.findUnique({
    where: { id: Number(id) }
  });
}
