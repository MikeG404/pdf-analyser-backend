import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, type StrategyOptions, type VerifiedCallback } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authService from '../services/auth.service.js';
import { db } from '../index.js';
import { usersTable } from '../db/schema.js';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

passport.use(new JwtStrategy(options, async (jwt_payload: any, done: VerifiedCallback) => {
    try {
        const user = await authService.findUserByEmail(jwt_payload.email);

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        return done (error, false);
    }
}))

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/api/auth/google/callback" as string
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value

            if (!email) {
                return done(new Error("No email found in Google Profile"), false);
            };

            let user = await authService.findUserByEmail(email);

            if (!user) {
                const [newUser] = await db.insert(usersTable)
                    .values({email: email, password: null})
                    .returning();

                if (!newUser) {
                    return done(null, false)
                }

                user = newUser;
            }

            if (!user) {
                return done(null, false);   
            }

            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
))

export default passport;