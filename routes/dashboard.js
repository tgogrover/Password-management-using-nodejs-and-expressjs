var express = require('express');
var router = express.Router();
var userModule=require('../models/sign_Model');
var bcrypt =require('bcrypt');
var jwt = require('jsonwebtoken');
var passCatModel=require('../models/passwordCategory');
var passModel=require('../models/passwordDetails');

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



router.get('/dashboard', checkLoginUser,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    passModel.estimatedDocumentCount({}).exec((err,count)=>{
      passCatModel.estimatedDocumentCount({}).exec((err,countasscat)=>{    
    res.render('dashboard', { title: 'Password Management System', loginUser:loginUser,msg:'',totalPassword:count, totalPassCat:countasscat });
    });
  });
  });

  module.exports = router;