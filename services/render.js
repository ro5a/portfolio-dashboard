const axios =require("axios");
exports.homeRoutes=(req,res)=>{
    axios.get('http://localhost:3000/api/experiences')
    .then(function(response){
        console.log(response)
        res.render("experience",{experiences:"response.data"});
    })
    .catch(err=>{
        res.send(err)
    })
     
}
exports.add_exper =(req,res)=>{
    res.render("add-exper");
}
exports.update=(req,res)=>{
    res.render("update"); 
}