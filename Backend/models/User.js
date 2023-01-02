const mongoose = require('mongoose');
// const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name : {
    type: 'string',
    required: true
  },
  email : {
    type: 'string',
    required: true,
    unique: true
  },
  password : {
    type: 'string',
    required: true,
    unique: true
  },
  date : {
    type : 'date',
    default: new Date
  }
});

const User = mongoose.model('user', UserSchema)
module.exports = User