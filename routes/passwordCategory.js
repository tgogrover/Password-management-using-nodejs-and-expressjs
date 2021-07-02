var express = require('express');
var router = express.Router();
var passCatModel = require('../models/passwordCategory');
var jwt = require('jsonwebtoken');
var mongoose=require('mongoose');

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


function checkpasswordCategory(req,res,next){
  var loginUser=localStorage.getItem('loginUser');
  const passwordCategory=req.body.passwordCategory;
 
 if(passwordCategory==''){
  
  return res.render('passwordCategory', { title: 'Password Management System',loginUser: loginUser, 
  errors:'You must have to fill Password Category Fields', success:'' });
      
 }
 next();
  
}
// const uniquepasswordCategory= async (req,res,next)=>{
//   var loginUser=localStorage.getItem('loginUser');
//   const passwordCategory=req.body.passwordCategory;
 
//   try{
//   const uniquepassCategory= await passCatModel.findOne({Password_Category:passwordCategory})
//   if (uniquepassCategory){
//    res.render('passwordCategory', { title: 'Password Management System',loginUser: loginUser, 
//   errors:'Already a same Password Category in this Email', success:'' });
//   }
//   next();
// }
//   catch (err){
//     console.log("error = "+err.msg)
//     res.send(err.msg)
//   }
  
// }


router.get('/passwordCategory',checkLoginUser ,function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    
    res.render('passwordCategory', { title: 'Password Management System',loginUser: loginUser,errors:'',success:'' });
  
    });

router.post('/passwordCategory',checkLoginUser,checkpasswordCategory,function(req, res, next) {
        var loginUser=localStorage.getItem('loginUser');
      
           var passCatName =req.body.passwordCategory;
           var passcatDetails =new passCatModel({
            Password_Category: passCatName,
          
           });
      
           passcatDetails.save(function(err,doc){
             if(err) {
               return res.render('passwordCategory', { title: 'Password Management System',loginUser: loginUser, 
               errors:'Already a same Password Category in this Email', success:'' });
               }
              
            if(doc){
             res.render('passwordCategory', { title: 'Password Management System',loginUser: loginUser, errors:'', success:'Password category inserted successfully' });
      }
            })
          
        
        });
  
  module.exports = router;