const mongoose = require('mongoose');

const Schema = mongoose.Schema

const learnerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('Leaner', learnerSchema);

module.exports = User;