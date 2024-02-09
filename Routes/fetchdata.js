var express = require('express');
var database = require('../model/logindata');
var profile = require('../model/profile');

  

var router = express.Router();

var index= require('../views/index');
var item= require('../views/item');
var product = require('../views/product');
var ar = require('../views/ar');
var login = require('../views/login');
var account = require('../views/account');
var order = require('../views/order');
var wishlist = require('../views/wishlist');


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

    const dataset = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }

    const uservalue = await database.find({email:[dataset.email]});
    if(uservalue.length > 0){
        res.exist = 'already registed';
        next();
    }
    else{
        const userdata = await database.insertMany(dataset)
        profile.fetchData(async(data)=>{
            const doc = await data.create(
                {
                  email : dataset.email,
                  data : `enter your name,${dataset.email},enter your mobile,enter your gender,enter yout DOB,enter yout altermobile, enter your address`
                }
              )
        })
        res.exist = 'successfully registered';
        next();
    }
        
},login.register);


router.get('/login',login.register);

router.post('/login', async (req,res,next)=>{

    const dataset = {

        email:req.body.email,
        password:req.body.password
    }

    const uservalue = await database.find({email:[dataset.email]});
    if(uservalue.length > 0){
        if(uservalue[0].password == dataset.password){
            profile.fetchData(async(data)=>{
            const doc = await data.find(
                {
                  email : uservalue[0].email,
                }
              )
            res.redirect(`/account?${doc[0]._id.toString()}`);
        })
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


router.get('/account',(req,res,next)=>{
    const userid = req.url.split("?")[1];
    res.user = userid;
    next();
},account.fetchData);

router.post('/account',async (req,res,next)=>{

    profile.fetchData(async(data)=>{
        const doc = await data.updateMany({
            email:req.body.email
        },
        {
        data:`${req.body.name.toString()}` + "," + `${req.body.mobile}` + `${req.body.email}` + "," + "," + `${req.body.gender}` + "," + `${req.body.dob}` + "," + `${req.body.altermobile}` + "," + `${req.body.address.toString()}` });
        
    })
    res.user = req.body.id;
    next();
},account.fetchData)


router.get('/order',order.fetchData)
router.get('/wishlist',wishlist.fetchData)

module.exports = router;