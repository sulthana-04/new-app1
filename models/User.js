const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6
        
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
        
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    mobile: {
        type: String,
        required:true
    },
    gender: {
        type: String,
        required:true
    },
    state: {
        type: String,
        required:true
    },
    district: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    
    date: {
        type: Date,
        default: Date.now
    }

});
mongoose.models = {}
module.exports = mongoose.model('User', userSchema);