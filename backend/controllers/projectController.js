const projectModel = require('../models/project');

const getAllProjects = async() => {
    return await projectModel.find({});
};

const getProjectsBySearch = async(query) => {
    const search = {projectName: new RegExp(query, 'i')};
    if(!query){
        search = {};
    }
    return await projectModel.find(search);
};

const updateProject = async(data, id) => {
    return await projectModel.findByIdAndUpdate(id, data);
};

const deleteProject = async(id) => {
    return await projectModel.findByIdAndDelete(id);
};

const addProject = async(data) => {
    await projectModel.create(data);
};

const getProjectById = async(id) => {
    return await projectModel.findById(id)
};

module.exports.getAllProjects = getAllProjects;
module.exports.updateProject = updateProject;
module.exports.deleteProject = deleteProject;
module.exports.addProject = addProject;
module.exports.getProjectById = getProjectById;
module.exports.getProjectsBySearch = getProjectsBySearch;