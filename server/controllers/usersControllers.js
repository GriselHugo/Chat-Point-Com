const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ message: "Username already exists", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ message: "Email already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    delete newUser.password;
    res.json({ message: "User created successfully", status: true, user: newUser });
  } catch (err) {
    next(err)
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect username, user not found", status: false });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ message: "Incorrect password", status: false });
    }
    delete user.password;
    res.json({ message: "User created successfully", status: true, user: user });
  } catch (err) {
    next(err)
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { image } = req.body;
    // console.log(image);
    const userData = await User.findByIdAndUpdate(
      id, {
        avatarImage: image,
        isAvatarImageSet: true,
      },
      { new: true }
    );

    if (!userData) {
      return res.json({ message: "User not found", status: false });
    }

    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (err) {
    next(err)
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err)
  }
};
