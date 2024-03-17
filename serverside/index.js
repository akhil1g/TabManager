const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const app = express();


const RegisterRouter = require("./routes/Register.js")
const LoginRouter = require("./routes/Login.js")
const HomeRouter = require("./routes/Home.js")
const SaveSessionRouter = require("./routes/SaveSession.js")
const RestoreSessionRouter = require("./routes/RestoreSession.js")


app.use(cors());
app.use(express.json());

//connecting mongodb server
mongoose.connect('mongodb://localhost:27017/tab-manager')
        .then(()=>{console.log("success")})
        .catch((err)=>{console.log(err)});


//routes
app.use("/api/register", RegisterRouter);
app.use("/api/login", LoginRouter);
app.use("/api/home", HomeRouter);
app.use("/api/savesession", SaveSessionRouter);
app.use("/api/restoresessions", RestoreSessionRouter);


const PORT = 2000;
app.listen(PORT , function(){
    console.log("server is running at port 2000");
});