const mongoose = require("mongoose");
const SessionInfo = new mongoose.Schema({
    email: { type: String, required: true },
    windowIds: [{ type: String }],
    tabs: [{ 
        title : String,
        id : String,
        url : String,
        pinned : Boolean
     }],
    date: {type : String, required: true}
}
)
const model = mongoose.model('Sessioninfo', SessionInfo);
module.exports = model;