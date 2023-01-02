const mongoose = require('mongoose');

var date = new Date();
const NotesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title : {
    type: 'string',
    required: true
  },
  tag : {
    type: 'string',
    default: "general"
  },
  description : {
    type: 'string',
    required: true,
  },
  date : {
    type : 'string',
    default: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }
});
const Notes = mongoose.model('notes', NotesSchema)
module.exports = Notes