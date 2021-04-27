const express=require('express');
const mongoose=require('mongoose');

var cat_PassSchema=new mongoose.Schema({
	Password_Category:{
		type:String,
		unique:true
    },
    date:  {
	        type:Date,
	        default:Date,

		   },    
	  
});
var pass_CatModel=mongoose.model('Password_Category',cat_PassSchema);
module.exports=pass_CatModel