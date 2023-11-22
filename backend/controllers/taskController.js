const taskModel = require('../models/task');


const addTask = async(data, id) => {
    data.project = id;
    await taskModel.create(data);
};

const getAllTasks = async(id) => {
    return await taskModel.find({project: id, isDone: false});
};

const makeTaskDone = async(id) => {
    const data = {isDone: true};
    await taskModel.findByIdAndUpdate(id, data)
}

const updateTask = async(data, id) => {
    return await taskModel.findByIdAndUpdate(id, data);
};

const deleteTask = async(id) => {
    return await taskModel.findByIdAndDelete(id);
};

module.exports.addTask = addTask;
module.exports.getAllTasks = getAllTasks;
module.exports.updateTask = updateTask;
module.exports.deleteTask = deleteTask;
module.exports.makeTaskDone = makeTaskDone;
