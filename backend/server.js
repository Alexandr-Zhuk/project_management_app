const express = require('express');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/tasks');
const projectRouter = require('./routes/projects');
const authRouter = require('./routes/auth');

const server = express();
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/projectManagement');

server.listen(5000);
server.use(cookieParser());

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(express.static(__dirname + '/public'));
server.use('/projects', projectRouter);
server.use('/tasks', taskRouter);
server.use('/auth', authRouter);
