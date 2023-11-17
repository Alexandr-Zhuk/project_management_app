const express = require('express');
//const Ajv = require('ajv');
const multer = require('multer');
const path = require('path');
const router = express.Router();
//const moment = require('moment');
const taskController = require('../controllers/taskController');

//const ajv = new Ajv();

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

// /tasks/list/:id
router.get('/list/:id', async(req, res) => {
    const id = req.params.id;
    const data = await taskController.getAllTasks(id);
    res.json(data);
});

// /tasks/change/done/:id
router.get('/change/done/:id', async(req, res) => {
  const id = req.params.id;
  await taskController.makeTaskDone(id);
  res.json({status: 'ok'})
});

// /tasks/change/:id
router.post('/change/:id', upload.none(), async(req, res) => {
    const task = req.body;
    console.log(task);
    const id = req.params.id;
    console.log(id);
    const data = await taskController.updateTask(task, id);
    const result = await taskController.getAllTasks(data.project);
    res.json(result);
});

// /tasks/delete/:id
router.get('/delete/:id', async(req, res) => {
    const id = req.params.id;
    await taskController.deleteTask(id);
    res.json({status: 'ok'});
});

// /tasks/add:id
router.post('/add/:id', upload.none(), async(req, res) => {
    const task = req.body;
    const id = req.params.id;
    await taskController.addTask(task, id);
    const data = await taskController.getAllTasks(id);
    res.json(data);
});

module.exports = router;