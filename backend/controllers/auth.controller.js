const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../db/models/User.model");

require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { fullName, email, confirmPassword, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User is already exists.", success: false });
    }

    const imagePaths = req.files.map((file) => file.path);
    const userModel = new UserModel({
      name: fullName,
      email,
      password: confirmPassword,
      image: imagePaths,
      role,
    });
    userModel.password = await bcrypt.hash(confirmPassword, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup Successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    // console.log("signup VVV")
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "User not exists.Authentication Failed!!!",
        success: false,
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(403).json({
        message: "Password is wrong.Authentication Failed!!!",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_ENCRYPT,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Login Successfully",
      success: true,
      jwtToken,
      email,
      name: user.name,
      role: user.role,
      kycStatus: user.kycStatus,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
