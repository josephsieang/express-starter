import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const GREETING_NAME = process.env.GREETING_NAME || 'world';
export const BEARER_TOKEN = process.env.BEARER_TOKEN || '';
