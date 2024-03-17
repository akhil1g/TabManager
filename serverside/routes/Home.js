const express = require("express");
const HomeRouter = express.Router();

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

HomeRouter.get("/", async function(req,res){
    try{
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token,'secretkey');
        const email = decoded.email;
        console.log(email);
        const user = await User.findOne({email:email});
        console.log(user.name);
        res.json({status : "ok",name : user.name});
    }
    catch(err){
        console.log(err);
        res.json({status:"error",error:"invalid-token"})
    }
});

module.exports = HomeRouter;