const { Schema, model } = require('mongoose')

const MeetingsSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    motherTongue: {
        type: String,
        required: true,
    },
    desiredLanguage: {
        type: String,
        required: true,
    },
    meetingLink: {
        type: String,
        required: true,
    },
    
});



const MeetingsModel = model('meeting', MeetingsSchema);

module.exports = MeetingsModel