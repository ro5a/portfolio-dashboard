const mongoose=require('mongoose');
var schema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        }
    }
)
const UserDB=mongoose.model('userdb',schema);
module.exports=UserDB;