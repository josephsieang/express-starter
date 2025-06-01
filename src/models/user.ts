import { User } from '@prisma/client';

export type UserRegisterPayload = Pick<User, 'email' | 'password' | 'name'>;
