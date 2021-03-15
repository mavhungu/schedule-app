var expressJwt = require('express-jwt');
var config = require('../config');

/*const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
});*/
const hasAuthorization = (req,res, next)=>{
    let t = req.cookies.t;
    console.log(t);
    next()
};
const signout = (req, res, next)=>{
    res.clearCookie("t");
    console.log('Cookie has been cleared');
    next()
};

module.exports = {hasAuthorization, signout};