const profile = require('../model/profile')

module.exports={
  
  fetchData:function(req, res){
    profile.fetchData(async function (data) {
      var data = await data.find({});
      res.render('account',{data});

    })
    }
}


