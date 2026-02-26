import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import authService from '../services/auth.service.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
    try {
        const user = await authService.isEmailAvailable(jwt_payload.email);

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    } catch (error) {
        return done (error, false);
    }
}))

export default passport;