const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message : {
      text: {
        type: String,
        required: [true, 'Message text is required'],
      },
    },
    users:Array,
    sender : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Message sender is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Messages', messageSchema);
