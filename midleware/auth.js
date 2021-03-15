var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var config = require('../config');

/*const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
});*/
const hasAuthorization = async (req,res, next)=>{
    let t = req.cookies.t;
    let token = jwt.verify(t,config.jwtSecret);
    await console.log(token);
    next()
};
const signout = async (req, res, next)=>{
    res.clearCookie("t");
    await console.log('Cookie has been cleared');
    next()
};

module.exports = {hasAuthorization, signout};