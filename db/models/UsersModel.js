const mongoose = require('mongoose');
const Users = mongoose.model('users',{
    /*authId:{
        type: String
    },
    role:{
        type: String
    },*/
    name:{
        required: true,
        type: String,
        trim: true,
        unique: true
    },
    password:{
        required: true,
        type: String,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = Users;