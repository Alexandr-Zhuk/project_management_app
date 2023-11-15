const mongoose = require('mongoose');

const {Schema} = mongoose;

const projectSchema = new Schema({
    projectName: {type: Schema.Types.String, minLength: 2, maxLength: 200, required: true},
    description: {type: Schema.Types.String, minLength: 2, required: true},
    user: {type: Schema.Types.ObjectId},

});

const model = mongoose.model('project', projectSchema);

module.exports = model;