const mongoose = require('mongoose');

const Schema = mongoose.Schema

const organizationSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    decription: { type: String, required: true},
}, {
    timestamps: true,
});

const Organization = mongoose.model('Organizations', organizationSchema);

module.exports = Organization;