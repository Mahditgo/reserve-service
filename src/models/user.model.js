const mongoose  = require('mongoose');


const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
         type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['admin', 'student'],
        default : 'student'
    },
    passwordResetToken  : String,
    passwordResetExpires : Date
    
}, { timestamps : true });


const userModel = mongoose.model('User', userSchema);
module.exports = userModel;