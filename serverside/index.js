
// imports
require("dotenv").config();

const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passport=require("passport");
const passportSetup=require("./passport");
const authRoute=require("./routes/auth")
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const app = express();


// middlewares
app.use(
  cookieSession({
      name: "app-auth", 
      keys: ["secret-new", "secret-old"], 
      maxAge: 24*60*60*100})
);


app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// including authentication routes
app.use("/auth", authRoute);


// listen
app.listen(2000, function () {
  console.log("server is running at port 3000");
});
