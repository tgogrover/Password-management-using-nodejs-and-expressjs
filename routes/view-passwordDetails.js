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
    res.redirect('/');
  }
  next();
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


router.get('/view-passwordDetails',checkLoginUser, function(req, res, next) {
 
    var loginUser=localStorage.getItem('loginUser');
  
    
    var options = {
      offset:   0, 
      limit:    3
  };
  
  passModel.paginate({},options).then(function(result){
  res.render('view-passwordDetails', { title: 'Password Management System',
  loginUser: loginUser,
  records: result.docs,
    current: result.offset,
    pages: Math.ceil(result.total / result.limit) 
  });
  });
  });
  
  router.get('/view-passwordDetails/:page',checkLoginUser, function(req, res, next) {
   
    var loginUser=localStorage.getItem('loginUser');
  
    var perPage = 3;
    var page = req.params.page || 1;
  
    getAllPass.skip((perPage * page) - perPage)
    .limit(perPage).exec(function(err,data){
  if(err) throw err;
  passModel.estimatedDocumentCount({}).exec((err,count)=>{    
  res.render('view-passwordDetails', { title: 'Password Management System',
  loginUser: loginUser,
  records: data,
    current: page,
    pages: Math.ceil(count / perPage) 
  });
    });
  });
  });
  
  
  
  module.exports = router;