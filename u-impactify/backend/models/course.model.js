const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  _id = {type: String},
  name = {type: String},
  description = {type: String},
  sessionsPerWeek = {type: String},
  weeks = {type: String},
  hoursPerWeek = {type: String},
  schedule = {type: String}
});

const Course = mongoose.model('Course', courseSchema)

module.exports = Course