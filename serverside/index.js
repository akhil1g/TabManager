const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./passport.js");
const app = express();

const RestoreSessionRouter = require("./routes/RestoreSession.js");
const SaveSessionRouter = require("./routes/SaveSession.js")
const authRoute = require('./routes/auth');



app.use(
  cookieSession({
    name: "app-auth",
    keys: ["secret-new", "secret-old"],
    maxAge: 24 * 60 * 60 * 100,
  })
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

//connecting mongodb server
mongoose
  .connect(
    "mongodb+srv://ishavishwakarma29:ishaTabManager@cluster0.qdm8x0l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
  .then(() => {
    console.log("success");
  })
  .catch((err) => {
    console.log(err);
  });


//routes
app.use("/auth", authRoute);
app.use("/api/savesession", SaveSessionRouter);
app.use("/api/restoresessions", RestoreSessionRouter);


const PORT = 2000;
app.listen(PORT , function(){
    console.log("server is running at port 2000");
});