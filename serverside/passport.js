require("dotenv");

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user.model");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

// mongoose connection string
mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });


// local strategies


// local login
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        console.log(username);
        console.log(password);
        const result = await User.findOne({ email: username });
        if (!result) return done(null, false);
        bcrypt.compare(password, result.password, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return done(err);
          } else {
            if (valid) {
              //Passed password check
              return done(null, result);
            } else {
              //Did not pass password check
              return done(null, false);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  )
);


// googel strategies
passport.use(
  new GoogleStrategy(
    {
      clientID: "944342896743-e3ad8fe2g3skmtcv8n153voi90u1i85s.apps.googleusercontent.com",
      clientSecret:"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",
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      const userExists = await User.findOne({ email: profile._json.email });
      return cb(null, userExists);
    }
  )
);



// serializations
passport.serializeUser(function (user, done) {
  console.log("Serialize user" + JSON.stringify(user._id));
  return done(null, user._id);
});



passport.deserializeUser(async (id, done) => {
  console.log("Deserialising user");
  const user = await User.findById(id);
  if (user) {
    console.log(user);
    const id = user._id;
    const email = user.email;
    const name = user.name;
    return done(null, JSON.stringify({ id: id, email: email, name: name }));
  } else {
    return done(new Error("No user with id is found"));
  }
});
