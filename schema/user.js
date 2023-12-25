var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email:String,
    userName: String,
    password: String,
    role: {
        type: String, 
        enum: ['admin', 'user'],
        default: 'user'
    }
});

module.exports = mongoose.model('user', schema);;

