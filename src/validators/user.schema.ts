import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});
// DTO stands for Data Transfer Object, a typed object used to define the structure of data being sent to or from a function — usually in request/response payloads or between layers like controllers and services.
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
