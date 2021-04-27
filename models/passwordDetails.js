const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var passSchema =new mongoose.Schema({
    Password_Category: {type:String, 
        required: true,
        },
        
        Password_Details: {type:String, 
            required: true,
           },
    date:{
        type: Date, 
        default: Date.now }
});
passSchema.plugin(mongoosePaginate);
var passModel = mongoose.model('password_details', passSchema);
module.exports=passModel;