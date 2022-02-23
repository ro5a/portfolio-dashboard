const mongoose= require('mongoose');
const connectDB= async()=>{
    try{
//connection
     const conn =mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
})

    }catch(err){
        console.log(err);
        process.exit(1);

    }
}
module.exports= connectDB;