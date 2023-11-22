const jwt = require('jsonwebtoken');
const config = require('../config/config');

const secureMV = (req, res, next) => {
    const authData = req.headers.authorization;
    if(!authData){
        next(res.json({status: 401}));
    }
    const accessToken = authData.split(' ')[1];
    
    if(!accessToken){
        next(res.json({status: 401}));
    }
    try{
        const result = jwt.verify(accessToken, config.SECRET_ACCESS_KEY);
        if(result){
            next();
            return;
        }
    }catch(err){
        next(res.json({status: 401}));
    }
   
};

module.exports = secureMV;