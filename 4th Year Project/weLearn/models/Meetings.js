const { Schema, model } = require('mongoose')

const MeetingsSchema = new Schema({
  dateNow: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: false

  },
  toEmail: {
    type: String,
    required: true,
    unique: false
  },
  motherTongue: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  meetingLink: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  toUserID: {
    type: String,
    required: true
  }

})

// MeetingsSchema.index({ email: 1, toEmail: 1 }, { unique: false});

const Meetings = model('Meetings', MeetingsSchema)

module.exports = Meetings
