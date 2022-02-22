const express=require("express");
const route =express.Router();
const services= require('../services/render');
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
  module.exports=route;