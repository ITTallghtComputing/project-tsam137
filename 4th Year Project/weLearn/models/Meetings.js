const { Schema, model } = require('mongoose')

const MeetingsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    toEmail: {
        type: String,
        required: true,
    },
    motherTongue: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    timezone: {
        type: String,
        required: true,
    },
    meetingLink: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    dateNow: {
        type: Date,
        default: Date.now,
    }
});



const Meetings = model('Meetings', MeetingsSchema);

module.exports = Meetings