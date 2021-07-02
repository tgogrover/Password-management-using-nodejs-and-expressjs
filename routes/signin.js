var express = require('express');
var router = express.Router();
var userModule=require('../models/sign_Model');
var bcrypt =require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET home page. */



function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=userModule.findOne({Email:email});
 checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('sign', { title: 'Password Management System', Error:'Email Already Exit',msg:""});

 }
 
 next();
 
  });
}


router.get('/signup',(req,res)=>{
  var loginUser=localStorage.getItem('loginUser');
  if(loginUser){
    res.redirect('./dashboard');
  }else{
  res.render('sign',{title: 'Password Management System', Error:'',msg:''})
  }
})


router.post('/signup',checkEmail, function(req,res){
        const email=req.body.email;
        const password=req.body.password;
        const confpassword=req.body.confpassword;
  if(password !=confpassword){
    res.render('sign', { title: 'Password Management System', Error:'Password and Confirm password should be same !',msg:''});
   
  }
  
 else{
   const hash_Password=bcrypt.hashSync(password,10)
      const userDetails=new userModule({
        Username:Math.random().toString(),
         Email:email,
          Password:hash_Password
        });
        userDetails.save((err,doc)=>{
       if(err) throw err;
      res.render('sign', { title: 'Password Management System', msg:'User Registerd Successfully',Error:'' });
    })  ;
     } 

  
});



module.exports = router;
