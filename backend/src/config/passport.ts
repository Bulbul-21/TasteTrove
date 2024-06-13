import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { PassportStatic } from "passport";
import { User } from "../models";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "",
};

export const authenticate = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user?._id);
        }
        return done(null, false);
      } catch (err) {
        console.error(err); // Log the error for debugging
        return done(err, false); // Pass the error to the done callback
      }
    })
  );
};

// import { Strategy, ExtractJwt } from "passport-jwt";
// import { PassportStatic } from "passport";
// import { User } from "../models";

// let options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.JWT_SECRET,
// };

// export const authenticate = (passport: PassportStatic) => {
//   passport.use(
//     new Strategy(options, async (jwt_payload, done) => {
//       try {
//         const user = await User.findById(jwt_payload.id);
//         if (user) {
//           return done(null, user?._id);
//         }
//         return done(null, false);
//       } catch (err) {
//         console.log(err);
//       }
//     })
//   );
// };
