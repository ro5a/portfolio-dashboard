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
    UserDB.find()
    .then(exper=>{
        exper.send(exper)
    })
    .catch(err=>{
        res.status(500).send({message:err.message ||"Error occured while retriving"});
    });
     
}
//update
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"data to update"})
    }
    const id=req.params.id; 
    UserDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"can not update "})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"error update information "
        })
    })

}
//delete
exports.delete=(req,res)=>{
    const id=req.params.id;
    UserDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:"can not delete"})
        }else{
            res.send({
                message:"it was deleted successfuly"
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"could not deleted"
        });
    });

}
