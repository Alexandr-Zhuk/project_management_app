const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const taskController = require('../controllers/taskController');
const secureMV = require('../middlewares/forAuth');

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

// /tasks/list/:id
router.get('/list/:id', secureMV, async(req, res) => {
    const id = req.params.id;
    const data = await taskController.getAllTasks(id);
    res.json(data);
});

// /tasks/change/done/:id
router.get('/change/done/:id', secureMV, async(req, res) => {
  const id = req.params.id;
  await taskController.makeTaskDone(id);
  res.json({status: 'ok'})
});

// /tasks/change/:id
router.post('/change/:id', secureMV, upload.none(), async(req, res) => {
    const task = req.body;
    const id = req.params.id;
    const data = await taskController.updateTask(task, id);
    const result = await taskController.getAllTasks(data.project);
    res.json(result);
});

// /tasks/delete/:id
router.get('/delete/:id', secureMV, async(req, res) => {
    const id = req.params.id;
    const data = await taskController.deleteTask(id);
    const result = await taskController.getAllTasks(data.project);
    res.json(result);
});

// /tasks/add:id
router.post('/add/:id', secureMV, upload.none(), async(req, res) => {
    const task = req.body;
    const id = req.params.id;
    await taskController.addTask(task, id);
    const data = await taskController.getAllTasks(id);
    res.json(data);
});

module.exports = router;