import { GREETING_NAME } from '../config/env';

export function getGreeting(): string {
  return `Hello, ${GREETING_NAME}!`;
}
