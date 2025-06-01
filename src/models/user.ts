import { User } from '@prisma/client';

export type UserRegisterPayload = Pick<User, 'email' | 'password' | 'name'>;
export interface UserAuthPayload {
  userId: number;
  role: string;
}
