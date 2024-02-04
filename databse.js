const express = require("express");



const app = express();

app.use(express.static("views"));

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");


app.use(require('./Routes/fetchdata'))


app.listen(3000,()=>{
    console.log("listening on port 3000")
});
