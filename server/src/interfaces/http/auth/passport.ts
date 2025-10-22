// server/src/interfaces/http/auth/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { AuthService } from '../../../application/services/authService.js';
import { Env } from '../../../config/env.js';
import { UserRepo } from '../../../infra/repositories/userRepo.js'; // <— เพิ่มบรรทัดนี้

passport.serializeUser((user: any, done) => done(null, user.id));

// เดิม: คืน { id } อย่างเดียว → แก้ให้ไปดึงจาก DB
passport.deserializeUser(async (id: number, done) => {
  try {
    const u = await UserRepo.findById(id);
    return done(null, u ?? { id });
  } catch (e) {
    return done(e);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET,
      callbackURL: Env.GOOGLE_CALLBACK_URL,
    },
    async (_at, _rt, profile, done) => {
      const email = profile.emails?.[0]?.value;
      const name = profile.displayName;
      const avatar = profile.photos?.[0]?.value;
      const user = await AuthService.upsertGoogleUser({
        id: profile.id,
        email: email!,
        name,
        avatar,
      });
      return done(null, user);
    }
  )
);

export default passport;
