const express = require("express");
const DeleteSessionRouter = express.Router();

const Sessions = require("../models/Sessions2.model")

DeleteSessionRouter.post("/", async function(req,res){
    console.log(req.body);
    try{
            const session = await Sessions.findOneAndDelete({ _id: req.body.sessionId})
            res.json({status:'ok'});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = DeleteSessionRouter;