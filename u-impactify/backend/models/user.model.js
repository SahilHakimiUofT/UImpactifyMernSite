const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: String},
    userName: {type: String, trim: true},
    userType: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String,},
    firstName: String,
    lastName: String,
    skills: String,
    completedCourses: [{type:String}],
    enrollCourse: [{
        courseId: String,
    }],
    languages: String,
    description: String,
    profilePicUrl: String,
    education: String, 
});

const User = mongoose.model('User-test2', userSchema);

module.exports = User;