import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address')
});

export const UserIdParamsSchema = z.object({
  id: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: 'ID must be a number'
    })
    .transform(Number)
});
