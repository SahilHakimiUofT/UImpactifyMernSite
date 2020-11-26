const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const positionSchema = new Schema({
    positionTitle: String,
    organization: String,
    employmentType: String,
    description: String,
    location: String,
    orgemail: String,
    applications: [{ type: Schema.Types.ObjectId, ref: 'Applications' }],
});

const Position = mongoose.model('Positions', positionSchema);

module.exports = Position;