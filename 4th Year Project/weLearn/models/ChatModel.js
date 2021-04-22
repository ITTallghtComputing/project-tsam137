const { Schema, model } = require('mongoose')

const ChatSchema = Schema({
  username: String,
  msg: String
})

const ChatModel = model('chat', ChatSchema)

ChatModel.find((err, result) => {
  if (err) throw err
})

module.exports = ChatModel
