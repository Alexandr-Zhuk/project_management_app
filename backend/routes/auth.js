const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const authController = require('../controllers/authController');

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

// /auth/registration
router.post('/registration', upload.none(), async(req, res) => {
    const data = req.body;
    const result = await authController.registration(data);
    res.cookie('refreshToken', result.payload.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    res.json({status: 'ok'});
});

// /auth/login
router.post('/login', upload.none(), async(req, res) => {
    const data = req.body;
    const result = await authController.login(data);
    if(result.status === 401){
        res.json({status: 401, message: 'Неверный логин или пароль'});
    }
    if(result.status === 200){
        res.cookie('refreshToken', result.payload.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.json({status: 200, message: 'Вы успешно авторизовались', accessToken: result.payload.accessToken});
    }
});

// /auth/logout
router.get('/logout', async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    const result = await authController.logout(refreshToken);
    if(result.message === 'Fail'){
        res.json({message: 'fail'});
    }
    res.clearCookie('refreshToken');
    res.json({message: 'ok'});
});

// /auth/refreshtoken
router.get('/refreshtoken', async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;

    try{
        const result = jwt.verify(refreshToken, config.SECRET_REFRESH_KEY);
        if(result){
            const data = await authController.checkRefresh(refreshToken);
            if(data.status === 401){
                res.clearCookie('refreshToken');
                res.json({status: 401});
            }
            if(data.status === 200){
                res.cookie('refreshToken', data.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                res.json({accessToken: data.tokens.accessToken});
            } 
        }
    }catch(err){
        res.clearCookie('refreshToken');
        res.json({status: 401});
    }
    
});


module.exports = router;