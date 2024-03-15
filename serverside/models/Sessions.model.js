const mongoose = require("mongoose");
const Sessions = new mongoose.Schema({
    email: { type: String, required: true },
    tabs: [{ 
              url : String
           }],
    date: { type: String, required: true }
}
)
const model = mongoose.model('Sessions', Sessions);
module.exports = model;
