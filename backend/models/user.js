const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {type: Schema.Types.String, required: true},
    profile: {
        name: {type: Schema.Types.String},
        surname: {type: Schema.Types.String},
        phone: {type: Schema.Types.String}
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;