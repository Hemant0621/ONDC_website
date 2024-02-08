const product = require("../model/data");
const mongoose = require("mongoose");




module.exports={
  
  fetchData:function(req, res){
    product.fetchData(async function(data){
        
      var productid = res.url.split("=")[1];
      var value = await data.findById(productid);
      res.render('product',{products:value});
      })
    }
}


