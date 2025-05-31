import { prisma } from '../lib/prisma';
import { CreateUserDto } from '../validators/user.schema';

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

export async function deleteUser(id: string): Promise<void> {
  return prisma.user.delete({
    where: { id: Number(id) }
  });
}

export async function updateUser(
  id: string,
  userData: Partial<CreateUserDto>
): Promise<CreateUserDto | null> {
  return prisma.user.update({
    where: { id: Number(id) },
    data: userData
  });
}
