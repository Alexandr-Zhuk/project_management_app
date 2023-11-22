const authModel = require('../models/auth');
const userModel = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');

const generateTokens = (id, email) => {

    const payloadAccess = {
        id,
        email,
        expire: new Date(Date.now() + 1000*60*5)
    };

    const payloadRefresh = {
        id,
        email,
        expire: new Date(Date.now() + 1000*60*60*24*30)
    };

    const accessToken = jwt.sign(payloadAccess, config.SECRET_ACCESS_KEY, {expiresIn: '10m'});
    const refreshToken = jwt.sign(payloadRefresh, config.SECRET_REFRESH_KEY, {expiresIn: '30d'});

    return {accessToken, refreshToken};
};

const login = async (data) => {
    const user = await authModel.findOne({'authData.email': data.email});
    if(!user){
        return {status: 401};
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.authData.password)
    if(!isPasswordCorrect){
        return {status: 401};
    }

    const tokens = generateTokens(user.userId, data.email);
    await authModel.findByIdAndUpdate(user._id, {isAuth: true, refreshToken: tokens.refreshToken});
    return {status: 200, payload: tokens}
};

const registration = async(data) => {
    const isCandidate = await userModel.findOne({email: data.email});
    if(isCandidate){
        return {status: 401, message: 'User already exist'};
    }

    const userData = {
        email: data.email,
        profile: {}
    };

    const registeredUser = await userModel.create(userData);

    const tokens = generateTokens(registeredUser._id, data.email);

    const hashPassword = await bcrypt.hash(data.password, 3);

    const authData = {
        strategy: 'local',
        userId: registeredUser._id,
        authData: {email: data.email, password: hashPassword},
        refreshToken: tokens.refreshToken
    };

    const resultAuth = await authModel.create(authData);    
    return {status: 200, payload: tokens};
};

const checkRefresh = async(refreshToken) => {
  
    const user = await authModel.findOne({refreshToken});
    if(user){
        const tokens = generateTokens(user.userId, user.authData.email);
        await authModel.findByIdAndUpdate(user._id, {refreshToken: tokens.refreshToken});
        return {status: 200, tokens: tokens};
    }

    return {status: 401} 
};

const logout = async(refreshToken) => {
    if(!jwt.verify(refreshToken, config.SECRET_REFRESH_KEY)){
        return {message: 'Fail'};
    }
    const result = await authModel.findOneAndUpdate({refreshToken}, {isAuth: false, refreshToken: ''});
    return {message: 'ok'}
};

module.exports.login = login;
module.exports.registration = registration;
module.exports.checkRefresh = checkRefresh;
module.exports.logout = logout;

