import 'dotenv/config';
export const Env = {
  PORT: Number(process.env.PORT || 4000),
  SESSION_SECRET: process.env.SESSION_SECRET || 'change_me',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  DATABASE_URL: process.env.DATABASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,
  ADMIN_EMAILS: (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  BOT_MISTAKE_RATE: Math.max(0, Math.min(1, parseFloat(process.env.BOT_MISTAKE_RATE || '0.35'))),
};
if (!Env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
