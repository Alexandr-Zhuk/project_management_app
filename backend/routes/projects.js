const express = require('express');
//const Ajv = require('ajv');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const projectController = require('../controllers/projectController');

//const ajv = new Ajv();

const pathUp = path.join(__dirname + '/../public/uploads');
const upload = multer({dest: pathUp});

// /projects/list
router.get('/list', async(req, res) => {
    const projectList = await projectController.getAllProjects();
    res.json(projectList);
});

// /projects/list/search/:project
router.get('/list/search/:query', async(req, res) => {
    const query = req.params.query;
    const projectList = await projectController.getProjectsBySearch(query);
    res.json(projectList);
});

// /projects/change
router.post('/change/:id', upload.none(), async(req, res) => {
    const id = req.params.id;
    const data = req.body;
    await projectController.updateProject(data, id);
    const projectList = await projectController.getAllProjects();
    res.json(projectList);
});

// /projects/delete
router.get('/delete/:id', async(req, res) => {
    const id = req.params.id;
    const result = await projectController.deleteProject(id);
    const projectList = await projectController.getAllProjects();
    res.json(projectList);
});

// /projects/add
router.post('/add', upload.none(), async(req, res) => {
    const newProject = req.body;
    await projectController.addProject(newProject);
    const projectList = await projectController.getAllProjects();
    res.json(projectList);
});

router.get('/view/:id', async(req, res) => {
    const id = req.params.id;
    const project = await projectController.getProjectById(id);
    res.json(project);
});


module.exports = router;