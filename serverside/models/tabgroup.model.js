const mongoose=require("mongoose");
//creating a Tab schema
const TabGroup=new mongoose.Schema({
    name:{type :String, required :true},
    color:{type: String,required:true},
    tabs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tab' }] 
   }
)
const model=mongoose.model('TabGroupSchema',TabGroup);
module.exports=model;