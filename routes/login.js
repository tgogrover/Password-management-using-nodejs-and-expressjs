var express = require('express');
var router = express.Router();
var userModule=require('../models/sign_Model');
var bcrypt =require('bcrypt');
var jwt = require('jsonwebtoken');


/* GET home page. */



if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

 

router.get('/login', function(req, res, next) {
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser){
    res.redirect('./dashboard');
  }else{
  res.render('login', { title: 'Password Management System', msg:'',Error:'' });
  }
});

router.post('/login', function(req, res, next) {
  var email=req.body.email;
  var password=req.body.password;
  var checkUser=userModule.findOne({Email:email});
  checkUser.exec((err, data)=>{
    if(err) throw err;
   if(data==null){
    res.render('login', { title: 'Password Management System', Error:"Email is not Registered !" ,msg:''});
    
   }else{
var hash_Password=data.Password;
if(bcrypt.compareSync(password,hash_Password)){
  var getUserID=data._id;
  var token = jwt.sign({ userID: getUserID }, 'loginToken');
  localStorage.setItem('userToken', token);
  localStorage.setItem('loginUser', email);
  res.redirect('/dashboard');
}else{
  res.render('login', { title: 'Password Management System', Error:"Invalid Password",msg:""});

}
   }
  });
 
});


router.get('/logout', function(req, res) {
  localStorage.removeItem('userToken');
  localStorage.removeItem('loginUser');
  res.redirect('/login');
});
module.exports = router;
