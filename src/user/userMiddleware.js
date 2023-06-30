const jwt = require('jsonwebtoken');
const userModel = require('./userModel');

const verifyUser =async (req, res, next) =>{
    try{
        let incomingToken  = req.headers['authorization']?.split(' ')[1];
        console.log('req: ', req.headers.authorization)
        let tokenRes = jwt.decode(incomingToken,'secretText');
        console.log('tokenREs: ', tokenRes)
        if(!tokenRes || !tokenRes.user){
            req.userEmail = null;
            req.userId = null;
            return next();
        }
        console.log("tokenRes: ", tokenRes)
        let user = await userModel.getUserById(tokenRes.user.id);
        if(!user){
            req.userEmail = null;
            req.userId = null;
            return next();
        }
        console.log('user: ', user)
        req.userEmail = user.email;
        req.userId = tokenRes.user.id
    } catch (error) {
        console.log('error in the verifyUser: ', error);
        next(error)
    }
    next();
}

module.exports = {
    verifyUser
}