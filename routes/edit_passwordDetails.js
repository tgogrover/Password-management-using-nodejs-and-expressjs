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


router.get('/',checkLoginUser, function(req, res, next) {
    res.redirect('/dashboard');
  });
  
  router.get('/passwordDetails/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var getPassDetails=passModel.findById({_id:id});
    getPassDetails.exec(function(err,data){
  if(err) throw err;
  getPassCat.exec(function(err,data1){
  res.render('edit_passwordDetails', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'' });
  });
  });
  });
  
  router.post('/passwordDetails/edit/:id',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var passwordCategory= req.body.passwordCategory;
    var passwordDetails= req.body.passwordDetails;
    passModel.findByIdAndUpdate(id,{Password_Category:passwordCategory,s:passwordDetails}).exec(function(err){
    if(err) throw err;
      var getPassDetails=passModel.findById({_id:id});
    getPassDetails.exec(function(err,data){
  if(err) throw err;
  getPassCat.exec(function(err,data1){
  res.render('edit_passwordDetails', { title: 'Password Management System',loginUser: loginUser,records:data1,record:data,success:'Password Updated Successfully' });
  });
  });
  });
  });
  
  router.get('/passwordDetails/delete/:id', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    var id =req.params.id;
    var passdelete=passModel.findByIdAndDelete(id);
    passdelete.exec(function(err){
      if(err) throw err;
      res.redirect('/view-passwordDetails');
    });
  });
  
  
  module.exports = router;