const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { json } = require("stream/consumers");
const CLIENT_URL = "http://localhost:3000";

// mongoose connection string
mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING)
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });



  // util route for login failed not required just for testing

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});


// log out route destrouys cookie-session
router.post("/logout", (req, res, next) => {
 req.session=null;
 res.redirect(CLIENT_URL);
});


// google OAuth get request
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


// callback for OAuth request
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: CLIENT_URL + "/login",
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    if(!user){
        res.redirect(CLIENT_URL);
    }
    req.logIn(user, (err) => {
      if(err){
        res.redirect(CLIENT_URL);
      }
      res.redirect(CLIENT_URL);
    })
  }
);


// login route
router.post("/login", (req, res, next) => {
  console.log("login hande");
  console.log(req.body);
  passport.authenticate("local-login", (err, user) => {
    if(err) {
      return res.status(401).json({
        timestamp: Date.now(),
        message: "Access denied username or password is wrong",
        code: 401,
      })
    }
    if(!user){
        return res.status(401).json({
          timestamp: Date.now(),
          message: 'Unauthorized user',
          code: 401
        })
    }
    req.logIn(user, (err) => {
      if(err){
        return next(err);
      }
      res.status(200).json({
        redirectTo: '/profile'
      })
    })
  })(req, res, next);
});


// check if user is logged in
router.get('/user', async(req, res)=>{
  console.log("isha"+req.isAuthenticated());
  try{
    if(!req.isAuthenticated())
    {
      return res.status(403).json({
        timestamp: Date.now(),
        message: 'access denied'
      });
    }
    const data = JSON.parse(req.user);
    const ID=data.id;
    console.log("hereeee" + ID);
    const user =await User.findById(ID);
    console.log("yayyy found you" + user);
    if(!user) return res.json({
      timestamp: Date.now(),
      message: 'User not found',
      code: 404
    });
    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      code: 200,
    });
  }catch(err){
    console.log(new Error(err.message));
    res.json({
      timestamp: Date.now(),
      message: 'Failed to get user internal error',
      code: 500
    })
  }
})


// register route
router.post("/api/register", async function (req, res) {
  console.log(req.body);
  try {
    const encryptedpw = await bcrypt.hash(req.body.password, 10);
    // const encryptedpw=await encrypt.encrypt(req.body.password);
    const user = await User.create({
      //creating a new user
      name: req.body.name,
      email: req.body.email,
      password: encryptedpw,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

module.exports = router;