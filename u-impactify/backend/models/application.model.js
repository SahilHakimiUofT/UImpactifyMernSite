const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    position: String,
    applicant: { type: String, ref: 'User-test2' },
    resumeId: String,
    coverLetterId: String,
});

const Application = mongoose.model('Applications', applicationSchema);

module.exports = Application;
