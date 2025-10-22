import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from './interfaces/http/auth/passport.js';
import { routes } from './interfaces/http/routes.js';
import { Env } from './config/env.js';
import { errorHandler } from './interfaces/http/middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: Env.CLIENT_URL, credentials: true }));
  app.use(bodyParser.json());
  app.use(
    session({
      secret: Env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
    })
  );

  // @ts-ignore
  app.use(passport.initialize());
  // @ts-ignore
  app.use(passport.session());

  app.use(routes);
  app.get('/health', (_req, res) => res.json({ ok: true }));

  // ต้องอยู่ท้ายสุด
  app.use(errorHandler);

  return app;
}
