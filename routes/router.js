const express=require("express");
const req = require("express/lib/request");
const route =express.Router();
const services= require('../services/render');
const controller =require('../controller/controller');
/**
 * @description Root Route
 * @method GET /
 */
route.get("/index", services.homeRoutes);
  route.get("/experience", function(req, res){
  
    res.render("experience"); 
  });
  route.get("/skills", function(req, res){
  
    res.render("skills"); 
  });
  route.get("/qualification", function(req, res){
  
    res.render("qualification"); 
  });
  /**
 * @description add experience
 * @method GET /add
 */
  route.get("/add-exper",services.add_exper)
  route.get("/update",services.update)
  //API
  route.post('/api/experiences',controller.create);
  route.get('/api/experiences',controller.find);
  route.put('/api/experiences/:id',controller.update);
  route.delete('/api/experiences/:id',controller.delete);
  module.exports=route;