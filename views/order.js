const product = require("../model/data");
const mongoose = require("mongoose");




module.exports={
  
  fetchData:function(req, res){
    product.fetchData(async function(data){
        
      res.render('order');
      })
    }
}


