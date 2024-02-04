var express = require('express');
var database = require('../model/logindata');

var router = express.Router();

var index= require('../views/index');
var item= require('../views/item');
var product = require('../views/product');
var ar = require('../views/ar');
var login = require('../views/login');
var account = require('../views/account');


router.get('/',index.fetchData);

router.get('/item',(req,res,next)=>{
    var data = req.url.split("?")[1].split("&");
    res.data=data;
    next();
},item.fetchData);

router.get('/product',(req,res,next)=>{
    
    res.url = req.url.split("?")[1];
    next();
},product.fetchData);


router.get('/product/ar',ar.fetchData);

router.get('/signup',login.register);

router.post('/signup', async (req,res,next)=>{

    const data = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

    const uservalue = await database.find({email:[data.email]});
    if(uservalue.length > 0){
        res.exist = 'already registed';
        next();
    }
    else{
        const userdata = await database.insertMany(data)
        res.exist = 'successfully registered';
        console.log(userdata);
        next();
    }
        
},login.register);


router.get('/login',login.register);

router.post('/login', async (req,res,next)=>{

    const data = {

        email:req.body.email,
        password:req.body.password
    }

    const uservalue = await database.find({email:[data.email]});
    if(uservalue.length > 0){
        if(uservalue[0].password == data.password){
            res.redirect('/item?Category=men');
        }
        else{
            res.exist = 'incorrect password';
            next();
        }
    }
    else{
        res.exist = 'user does not exist';
        next();
    }
        
},login.register);


router.get('/account',account.fetchData);


module.exports = router;