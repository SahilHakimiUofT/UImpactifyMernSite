const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  _id: {type: String},
  name: {type: String},
  description: {type: String},
  outline: [{
    lessonNumber: {type: String},
    topic: {type: String},
    assessment: {type: String}
  }],
  instructor: {type: String},
  lessons: {type: String},
  tasks: {type: String},
  lessonLength: {type: String},
  startDate: {type: Date},
  endDate: {type: Date},
  preReq: [{type: String}],
  preReqFor: [{type: String}],
  difficultyLevel: {type: String},
  pictureUrl: {type: String}
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course