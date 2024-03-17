const express = require("express");
const SaveSessionRouter = express.Router();

const Sessions = require("../models/Sessions2.model")

SaveSessionRouter.post("/", async function(req,res){
    console.log(req.body);
    try{
        const session = await Sessions.create({     
            email: req.body.email,
            windowIds : req.body.allWindows, 
            tabs : req.body.allTabs,
            date: req.body.date
        })
        res.json({status:'ok'});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = SaveSessionRouter;