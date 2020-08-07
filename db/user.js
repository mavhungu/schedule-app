const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = new schema({
    name:{
        required: true,
        type: String,
        trim: true
    },
    password:{
        required: true,
        type: String,
        trim: true
    }
});
module.exports = User;