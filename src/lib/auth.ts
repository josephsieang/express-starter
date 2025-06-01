import bcrypt from 'bcryptjs';
import { BEARER_TOKEN } from '../config/env';
import jwt from 'jsonwebtoken';
import type { UserAuthPayload } from '../models/user-auth-payload';

const JWT_SECRET = BEARER_TOKEN;

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(userId: number, role: string): string {
  return jwt.sign({ userId, role }, JWT_SECRET, {
    expiresIn: '1h'
  });
}

export function verifyToken(token: string): UserAuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserAuthPayload;
  } catch (error) {
    return null;
  }
}
