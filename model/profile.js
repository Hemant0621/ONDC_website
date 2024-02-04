const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/ondc");

const profileschema = new mongoose.Schema({
    name:String,
    mobile:Number,
    gender:String,
    dob:String,
    altermobile:Number,
    email:String,
    password: String,
    address:String
})

var con = mongoose.connection;

con.on('connected',()=>{
    console.log("data base is connected");
})


module.exports={

    fetchData:async function(callback){
        var profile = mongoose.model("profile",profileschema);
        return callback(profile);
    }
}