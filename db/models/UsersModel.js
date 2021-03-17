const mongoose = require('mongoose');
var config = require('../../config');
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
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
        required: true,
        lowercase: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    updated: Date,
    created:{
        type: Date,
        default: Date.now
    }
});

userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject
};

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({email});
    if (!user) {
        return console.warn('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return console.warn('Email and password don\'t match.')
    }
    return user
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

const Users = mongoose.model('users',userSchema);
module.exports = Users;