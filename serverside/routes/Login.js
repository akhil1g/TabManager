const express = require("express");
const LoginRouter = express.Router();

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

LoginRouter.post("/", async function(req,res){
    console.log(req.body);
    try{
        const user = await User.findOne({
            email:req.body.email, 
        })
        const isValid = await bcrypt.compare(req.body.password, user.password);
        console.log(user);
        if(isValid){
            const token = jwt.sign({name:req.body.name,email:req.body.email},"secretkey")
            res.json({status: 'ok', user : token});
        }else{
            console.log("running");
            return res.json({status : 'error', user: false});
        }
    }
    catch(err){
        console.log(err);
        res.json({status:'error',error: 'Duplicate Email'})
    }
})

module.exports = LoginRouter;