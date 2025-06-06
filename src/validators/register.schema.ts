import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
});
export const LoginSchema = RegisterSchema.omit({
  name: true
});
