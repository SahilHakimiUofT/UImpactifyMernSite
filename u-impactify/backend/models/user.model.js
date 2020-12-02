const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: String},
    userName: {type: String, trim: true},
    userType: {type: String},
    email: {type: String, unique: true},
    phoneNumber: {type: String,},
    firstName: String,
    lastName: String,
    skills: String,
    completedCourses: [{type:String}],
    enrollCourse: [{
        courseId: {type:String, ref: 'Course'}
    }],
    languages: String,
    description: String,
    profilePicUrl: String,
    education: String, 
});

const User = mongoose.model('User-test2', userSchema);

module.exports = User;