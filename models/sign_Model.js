const mongoose = require('mongoose');
var userSchema =new mongoose.Schema({
    Username: {type:String, 
        required: true,
        trim:true
    },
	Email: {
        type:String, 
        required: true,
        unique:true,
        lowercase:true
    },
    Password: {
        type:String, 
        required: true,
        minlength:6,
    },
    Date:{
        type: Date, 
        default: Date.now }
});

var userModel = mongoose.model('users', userSchema);
module.exports=userModel;