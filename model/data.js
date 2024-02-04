const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://hemantkumar2335h:Hemant12@mydata.wprhwlz.mongodb.net/ondc");

const reviewschema = new mongoose.Schema({
    name:String,
    Rating:Number,
    comment:String
})

const garmentsSchema = new mongoose.Schema({
    productid:String,
    productname: String,
    discount:Number,
    category:String,
    gender:String,
    price:Number,
    size:String,
    description:String,
    review:[reviewschema]
})

var con = mongoose.connection;

con.on('connected',()=>{
    console.log("data base is connected");
})


module.exports={

    fetchData:async function(callback){
        var products = mongoose.model("garments",garmentsSchema);
        return callback(products);
    }
}