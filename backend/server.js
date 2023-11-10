const express = require('express');
const taskRouter = require('./routes/tasks');
const projectRouter = require('./routes/projects');

const server = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/projectManagement');

server.listen(5000);

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static(__dirname + '/public'));
server.use('/projects', projectRouter);
server.use('/tasks', taskRouter);
