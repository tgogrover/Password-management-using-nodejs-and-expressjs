var express = require('express');
var router = express.Router();
var userModule=require('../models/sign_Model');
var passCatModel = require('../models/passwordCategory');
var passModel = require('../models/passwordDetails');
var jwt = require('jsonwebtoken');


var getPassCat= passCatModel.find({});
var getAllPass= passModel.find({});
/* GET home page. */

function checkLoginUser(req,res,next){
  var userToken=localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect('/login');
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


router.get('/passwordDetails', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    getPassCat.exec(function(err,data){
  if(err) throw err;
  res.render('passwordDetails', { title: 'Password Management System',loginUser: loginUser,records: data,success:''});
  
    });
    });
  
    router.post('/passwordDetails', checkLoginUser,function(req, res, next) {
      var loginUser=localStorage.getItem('loginUser');
  var passwordCategory= req.body.passwordCategory;
  var passwordDetails= req.body.passwordDetails;
  
   var password_details= new passModel({
    Password_Category:passwordCategory,
     Password_Details:passwordDetails
   });
      
    password_details.save(function(err,doc){
    getPassCat.exec(function(err,data){
       if(err) throw err;
    res.render('passwordDetails', { title: 'Password Management System',loginUser: loginUser,records: data,success:"Password Details Inserted Successfully"});
    
     });
    
      });
      });
  
  module.exports = router;