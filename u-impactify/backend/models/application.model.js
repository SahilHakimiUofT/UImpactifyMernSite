const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    positionId: String,
    applicantId: String,
    resumeId: String,
    coverLetterId: String,
});

const Application = mongoose.model('Applications', applicationSchema);

module.exports = Application;
