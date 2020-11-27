const { Schema, model } = require('mongoose')

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
    }
})

const ProfilesList = model('ProfilesList', ProfilesListSchema)

module.exports = ProfilesList
