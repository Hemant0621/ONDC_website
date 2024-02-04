const product = require("../model/data");
const mongoose = require("mongoose");




module.exports={
  
  fetchData:function(req, res){

    product.fetchData(async function(data){
        var value = res.data;

        var len = value.length;
        let i;
        
        let criteria = {}

        for(i=0;i<len;i++){

          if(value[i].split('=')[0]=='price'){
            criteria['price'] = {$gte : parseInt(value[i].split('=')[1]) };
          }

          else if(value[i].split('=')[0]=='Discount'){
            criteria['Discount'] = {$gte : parseInt(value[i].split('=')[1]) };
          }
        }

        
        value.forEach(e => {
          var value =e.split('=');
          if(value[0]!='price' && value[0]!='Discount'){
            criteria[value[0]] = value[1];
          }
        });
        data = await data.find(criteria);

        res.render('item',{products:data});
      })
    }
}


