import { Prisma } from '@prisma/client';

/**
 * Checks if the error is a Prisma unique constraint violation (e.g., duplicate email).
 */
export function isPrismaUniqueConstraintError(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === 'P2002'
  );
}
