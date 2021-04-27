var express = require('express');
var router = express.Router();
var userModule=require('../models/sign_Model');
var passCatModel = require('../models/passwordCategory');
var passModel = require('../models/passwordDetails');
var mongoose =require('mongoose');
var jwt = require('jsonwebtoken');

var getAllPass= passModel.find({});
var getPassCat= passCatModel.find({});
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
function checkpasswordCategory(req,res,next){
    const passwordCategory=req.body.passwordCategory;
    var loginUser=localStorage.getItem('loginUser');
   
   if(passwordCategory==''){
    
    res.render('view-passwordCategory', { title: 'Password Management System',loginUser: loginUser, 
    errors:'You must have to fill Password Category Fields', success:'' });
        
   }
   next();
    
  }

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.get('/view-passwordCategory', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');

    getPassCat.exec(function(err,data){
      if(err) throw err;
    res.render('view-passwordCategory', { title: 'Password Management System',loginUser: loginUser,records:data});
  });
  });

  router.get('/view-passwordCategory/delete/:id', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var passcat_id=req.params.id;
    var passdelete=passCatModel.findByIdAndDelete(passcat_id);
    passdelete.exec(function(err){
      if(err) throw err;
      res.redirect('/view-passwordCategory');
    });
  });
  
  router.get('/view-passwordCategory/edit/:id',checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var passcat_id=req.params.id;
    var getpassCategory=passCatModel.findById(passcat_id);
    getpassCategory.exec(function(err,data){
      if(err) throw err;
   
      res.render('edit-passwordCategory', { title: 'Password Management System',loginUser: loginUser,errors:'',success:'',records:data,id:passcat_id});
  
    });
  });
  
  router.post('/view-passwordCategory/edit/', checkpasswordCategory,checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var passcat_id=req.body.id;
    var passwordCategory=req.body.passwordCategory;
   var update_passCat= passCatModel.findByIdAndUpdate(passcat_id,{Password_Category:passwordCategory});
   update_passCat.exec(function(err,doc){
      if(err) throw err;
   
  res.redirect('/view-passwordCategory');
    });
  });
  
  module.exports = router;