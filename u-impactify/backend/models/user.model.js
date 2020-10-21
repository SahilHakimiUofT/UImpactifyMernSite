const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {type: String, required: true, trim: true},
    userType: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, unique: true},
    firstName: String,
    lastName: String,
    skills: String,
    completedCourses: String,
    languages: String,
    description: String,
    education: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;