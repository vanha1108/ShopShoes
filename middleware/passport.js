const passport = require('passport')
const GoogleStrategy  = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, PORT} = require('../config')

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${PORT}/api/user/auth/google/callback`,
},  async(req,accessToken, refreshToken, profile, done) => {
    try {
        userProfile=profile;
        console.log(userProfile)
        done(null, userProfile);
    } catch (error) {
        done(error, false)
    }
}))
passport.use(new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${PORT}/api/user/auth/facebook/callback`,
      //profileFields: ["email", "name"]
    },
    function(req, accessToken, refreshToken, profile, done) {
    //const { email, first_name, last_name } = profile._json;
    //   const userData = {
    //     email,
    //     firstName: first_name,
    //     lastName: last_name
    //   };
    //   new userModel(userData).save();
    //   done(null, profile);
    try {
        userProfile=profile;
        console.log(userProfile)
        done(null, userProfile);
    } catch (error) {
        done(error, false)
    }
    }
  )
)
