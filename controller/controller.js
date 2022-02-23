var UserDB=require('../model/model');
//new experience
exports.create=(req,res)=>{
if(!req.body){
     res.status(400).send({message:"content can not be empty!"});
     return;
}
const exper=new UserDB({
    name:req.body.name
})
exper.save(exper)
.then(data=>{
     res.send(data)
})
.catch(err=>{
    res.status(500).send({
        message:err.message || "some error acurred white created opertion"
    });
});
}
//rettrive and return
exports.find=(req,res)=>{
     
}
//update
exports.update=(req,res)=>{

}
//delete
exports.delete=(req,res)=>{

}
