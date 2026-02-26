import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, type StrategyOptions, type VerifiedCallback } from "passport-jwt";
import authService from '../services/auth.service.js';

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

export default passport;