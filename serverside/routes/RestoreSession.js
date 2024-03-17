const express =require("express");
const RestoreSessionRouter = express.Router();

const Sessions = require("../models/Sessions2.model")

RestoreSessionRouter.post("/", async function (req, res) {
    try{
        const {email} = req.body;
        const data = await Sessions.find({email});
        res.json({ data });
    }catch(err){
        console.log(err);
        res.json({ status: "error" });
    }
});

module.exports = RestoreSessionRouter;