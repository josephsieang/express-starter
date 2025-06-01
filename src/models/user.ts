import { User } from '@prisma/client';

export type UserRegisterPayload = Pick<User, 'email' | 'password' | 'name'>;
export type UserLoginPayload = Pick<User, 'email' | 'password'>;

export interface UserAuthPayload {
  userId: number;
  role: string;
}
