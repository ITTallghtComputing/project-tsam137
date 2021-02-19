const { Schema, model } = require('mongoose')

/* User Schema */
const ProfilesListSchema = new Schema({
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
    password: {
        type: String,
        required: true,
    },
    motherTongue: {
        type: String,
        required: true,
    },
    desiredLanguage: {
        type: String,
        required: true,
    },
    meetingPlatform: {
        type: String,
        required: true,
    },
    premium: {
        type: Boolean,
    },
    meetingCount: {
        type: Number,
        default: 0,
    },
    meetingRating: {
        type: Number,
        default: 0,
    },
})

const ProfilesList = model('ProfilesList', ProfilesListSchema)

module.exports = ProfilesList

