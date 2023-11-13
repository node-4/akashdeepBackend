const userModel = require("../model/remitter");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const phone = req.body.phoneNumber;
    const phoneNumber = await userModel.findOne({ phoneNumber: phone });
    if (phoneNumber) {
      const otp = Math.floor(Math.random() * 10000 + 1);
      console.log(otp);
      phoneNumber.otp = otp;
      await phoneNumber.save();
      return res.status(400).json({ msg: "phone number already exist", phoneNumber: phoneNumber });
    }

    const otp = Math.floor(Math.random() * 10000 + 1);
    console.log(otp);
    const user = await userModel.create({ phoneNumber: phone, otp: otp, FullName: req.body.FullName, email: req.body.email, });
    console.log(user);
    // console.log(user._id.toString());
    // // const createWallet = await Wallet.create({ user: user._id.toString() });
    // // console.log(createWallet);
    if (user) {
      return res.status(200).json({ msg: "otp has been sent to your number", user: user });
    } else {
      return res.status(400).json({ msg: "Something went wrong, try again" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: err.message });
  }
};
// CREATE - POST request to create a new user document
// exports.createUser = async (req, res) => {
//   try {
//     const newUser = new userModel(req.body);
//     await newUser.save();
//     res.status(201).send(newUser);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// READ - GET request to retrieve all user documents
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};
// READ - GET request to retrieve a specific user document by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
// UPDATE - PUT request to update a specific user document by ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true, });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
// DELETE - DELETE request to delete a specific user document by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports.verifySignIn = async (req, res) => {
  try {
    const { otp } = req.body;
    const verifyOtp = await userModel.findOne({ otp: otp, });
    if (!verifyOtp || verifyOtp.length == 0) {
      return res.status(400).json({ msg: "invalid otp" });
    } else {
      const data = { _id: verifyOtp._id, phoneNumber: verifyOtp.phoneNumber };
      const token = jwt.sign({ id: verifyOtp._id.toString() }, process.env.KEY, { expiresIn: "1d", });
      return res.status(200).json({ msg: "signIn successfull", data: data, Token: token });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message, name: error.name });
  }
};
exports.loginProfile1 = async (req, res) => {
  try {
    const userexists = await userModel.findOne({ phoneNumber: req.body.phoneNumber, });
    console.log(userexists);
    if (!userexists || userexists.length == 0) {
      return res.status(400).json({ msg: "user does not exist" });
    }
    if (userexists.phoneNumber != req.body.phoneNumber) {
      return res.status(400).json({ message: "phoneNumber Not Match  ", });
    }
    const token = jwt.sign({ _id: userexists._id }, process.env.KEY, { expiresIn: "15d", });
    console.log(token);
    return res.status(200).json({ msg: "login successfull", otp: userexists.otp, Token: token, _id: userexists._id, });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
};
exports.socialLogin = async (req, res) => {
  try {
    const { google_id } = req.body;
    const user = await userModel.findOne({ google_id: google_id });
    console.log(user);
    if (!user) {
      const data1 = { google_id: req.body.google_id, FullName: req.body.FullName, email: req.body.email, phoneNumber: req.body.phoneNumber, };
      const create = await userModel.create(data1);
      console.log(create);
      const accessToken1 = jwt.sign({ id: create._id }, process.env.KEY, { expiresIn: "1d", });
      res.setHeader("x-api-key", /* "Bearer "*/ +accessToken1);
      return res.status(200).send({ message: "logged in successfully", accessToken: accessToken1, data: create, });
    }
    const accessToken = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "1d", });
    return res.status(200).send({ message: "logged in successfully", accessToken: accessToken, data: user, });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "internal server error" + err.message });
  }
};
