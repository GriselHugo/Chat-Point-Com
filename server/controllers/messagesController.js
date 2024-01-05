const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({ message: "Message sent successfully" });
    } else {
      return res.json({ message: "Message not sent" });
    }
  } catch (err) {
    next(err)
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      }
    });
    res.json(projectedMessages);
  } catch (err) {
    next(err)
  }
};
