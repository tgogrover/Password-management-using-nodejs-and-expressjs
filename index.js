const express=require('express');
const app=express();
var path = require('path');
const userSign=require('./routes/signin')
const mongoose=require('mongoose');
const loginUser=require('./routes/login')
const bodyParser=require("body-parser")
const userDashboard=require('./routes/dashboard')
const passCatRoute=require('./routes/passwordCategory');
const viewpassCategory=require('./routes/view-passwordCategory');
const passDetRoute=require('./routes/passwordDetails');
const viewpassDetails=require('./routes/view-passwordDetails');
const editpassDetails=require('./routes/edit_passwordDetails');
mongoose.connect("mongodb://localhost:27017/pms-project",{useCreateIndex:true, useUnifiedTopology:true, useNewUrlParser:true,useFindAndModify:false})
mongoose.connection.on("connected",()=>{
    console.log("Database is connected");
})

mongoose.connection.on("error",(err)=>{
    console.log(err);
})



app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(userSign);
app.use(userDashboard);
app.use(loginUser);
app.use(passCatRoute);
app.use(viewpassCategory);
app.use(passDetRoute);
app.use(viewpassDetails);
app.use(editpassDetails)
app.listen(3000,()=>{
    console.log('server:3000 is working successfully')
})
