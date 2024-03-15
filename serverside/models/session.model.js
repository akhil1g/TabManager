const mongoose = require("mongoose");
const { array } = require("prop-types");
//Creating a Session schema
const Session=new mongoose.Schema({
    email:{type:string,unique:true,required:true},
    windowIds: [{type:string}]
   }
)


const model=mongoose.model('SessionData',Session);

module.exports=model;
// module.exports=model2;
