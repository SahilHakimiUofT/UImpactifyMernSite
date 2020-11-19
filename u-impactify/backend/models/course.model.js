const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {type: String},
  description: {type: String},
  outline: [{
    topic: {type: String},
    lessonNumber: {type: String}
  }],
  instructor: {type: String},
  lessons: {type: String},
  startDate: {type: Date},
  endDate: {type: Date},
  preReq: [{type: String}],
  preReqFor: [{type: String}],
  difficultyLevel: {type: String},
  pictureUrl: {type: String}
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course