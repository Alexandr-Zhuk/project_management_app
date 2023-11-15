const express = require('express');
//const Ajv = require('ajv');
//const multer = require('multer');
const path = require('path');
const router = express.Router();
//const moment = require('moment');
const taskController = require('../controllers/taskController');

//const ajv = new Ajv();

const pathUp = path.join(__dirname + '/../public/uploads');
//const upload = multer({dest: pathUp});


// /tasks/list
router.get('/list', async(req, res) => {
    
});

// /tasks/change
router.post('/change', async(req, res) => {
  
});

// /tasks/delete
router.post('/delete', async(req, res) => {
    
});

// /tasks/add
router.post('/add', async(req, res) => {
    
});

module.exports = router;