const mongoose = require('mongoose');



const userSchema=mongoose.Schema({
   
     name:{type:String,
           required:true,
     },
     place:{
           type:String,
           required:true
     }
     }
);
const experiences=mongoose.model("experiences",userSchema);
module.exports=experiences;

 
// module.exports = mongoose.model("Experiences", Emodel);
