const mongoose = require("mongoose");

module.exports={
  
  register:function(req, res){
    var exist = res.exist;
    res.exist = null;
    res.render('login',{exist});
    }
}


