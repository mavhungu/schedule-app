var expressJwt = require('express-jwt');
var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../config');
var Users = require('../db/models/UsersModel');

/*const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
});*/
const hasAuthorization = async (req,res, next)=>{
    try{
        let t = req.cookies.t;
        let token = jwt.verify(t,config.jwtSecret);
        let user = await Users.findOne({_id:token._id, 'tokens.token':t});
        if(!user){
            throw new Error()
        }
        req.user = user
        next()

    }catch(e){
        res.status(401).send({error: 'Please Authenticate'})
    }
};
const signout = async (req, res, next)=>{
try{
    res.clearCookie("t");
    next()
}catch(e){
    res.status(500).send()
}
};

module.exports = {hasAuthorization, signout};