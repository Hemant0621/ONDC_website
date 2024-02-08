const profile = require('../model/profile')


module.exports={
  
  fetchData:function(req, res){
    profile.fetchData(async function (e) {
      const user = res.user;
      var value = await e.findById(user);
      var entry = value.data.split(",");
      const data = {
        id : user,
        name : entry[0],
        email : value.email,
        mobile : entry[2],
        gender : entry[3],
        dob : entry[4],
        altermobile : entry[5],
        address : entry[6]
      }
      res.render('account',{data});
    })
    }
}


