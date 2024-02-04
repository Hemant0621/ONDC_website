const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/ondc");

const loginschema = new mongoose.Schema({
    name:String,
    email:String,
    password: String,
})

var con = mongoose.connection;

con.on('connected',()=>{
    console.log("data base is connected");
})


module.exports = new mongoose.model("user",loginschema);
