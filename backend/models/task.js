const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema({
    taskName: {type: Schema.Types.String, minLength: 2, required: true},
    isDone: {type: Boolean, default: false},
    project: {type: Schema.Types.ObjectId, ref: 'project', default: null},
    user: {type: Schema.Types.ObjectId}
});

const model = mongoose.model('task', taskSchema);

module.exports = model;