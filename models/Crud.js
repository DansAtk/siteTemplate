const mongoose = require('mongoose');

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        lowercase: true,
        enum: ['a', 'b', 'c'],
        default: 'a'
    }
});

const Crud = mongoose.model('Crud', crudSchema);

module.exports = Crud;