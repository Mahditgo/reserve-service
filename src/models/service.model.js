const mongoose = require('mongoose');



const serviceSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    univercityName : String,
    fromLocation : {
        type : String,
        required : true
    },
    toLocation : {
        type : String,
        required : true
    },
    vehicleNumber : {
        type : String,
        required : true
    },
    departureTime : {
        type : Date,
        required  :true
    },
    capacity : {
        type : Number,
        required : true
    },
    isActive : {
        type : Boolean,
        required : true
    }
}, { timestamps : true });

const serviceModel = mongoose.model('Service',   serviceSchema);
module.exports = serviceModel;