import { CreateUserDto } from '../validators/user.schema';

const users: CreateUserDto[] = [];

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
  // Simulate a database operation
  users.push(user);
  return user;
}

export async function getUsers(): Promise<CreateUserDto[]> {
  // Simulate fetching users from a database
  return users;
}
