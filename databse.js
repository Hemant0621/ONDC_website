const express = require("express");



const app = express();

app.use(express.static("views"));

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.set("view engine","ejs");


app.use(require('./Routes/fetchdata'))

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});
