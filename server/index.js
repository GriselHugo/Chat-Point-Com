const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messagesRoutes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(err);
});

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
