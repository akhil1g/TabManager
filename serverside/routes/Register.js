const express = require("express");
const RegiterRouter = express.Router();

const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

RegiterRouter.post("/", async function(req,res){
    console.log(req.body);
    try{
        const encryptedpw = await bcrypt.hash(req.body.password,10);
        //creating a new user
        const user = await User.create({    
            name: req.body.name,
            email: req.body.email,
            password: encryptedpw,
        })
        res.json({status:'ok'});
        console.log('user registered successfully');
    }
    catch(err){
        console.log(err);
        res.json({status:'error', error: 'Duplicate Email'})
    }
})

module.exports = RegiterRouter;