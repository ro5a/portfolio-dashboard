const mongoose= require('mongoose');
require('dotenv').config();

const connectDB= async()=>{
    try{
//connection

const con=await mongoose.connect(process.env.MONGO_URL,
     { useNewUrlParser: true,
         useUnifiedTopology: true,
         
}) .then(() => {
     console.log('Connected to Mongo! '); 
    }) .catch((err) => { 
        console.error('Error connecting to Mongo', err);
     });


    }catch(err){
        console.log(err);
        process.exit(1);

    }
}
module.exports= connectDB;