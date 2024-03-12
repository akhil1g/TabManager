const mongoose=require("mongoose");
//creating a Tab schema
const Tab=new mongoose.Schema({
    name:{type :String, required :true},
    link :{type :String, required :true},
    favicon: { type: String },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'TabGroup' }
   }
)
const model=mongoose.model('TabSchema',Tab);
module.exports=model;