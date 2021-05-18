const mongoose = require('mongoose');


const PostSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
        
    },
    Gender: {
        type: String,
        required: true
        
    },
    Email: {
        type: String,
        required: true
        
    },
    postImage:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('posts', PostSchema);