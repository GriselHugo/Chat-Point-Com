const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username must be at most 20 characters long'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: [3, 'Email must be at least 3 characters long'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Users', userSchema);
