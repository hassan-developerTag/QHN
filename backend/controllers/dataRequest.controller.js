const UserModel = require("../db/models/User.model");
const DataRequestModel = require("../db/models/dataRequest.model");
require("dotenv").config();

const getUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "User data retrieved successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const postDataRequest = async (req, res) => {
  try {
    const { dataType, purpose, paymentAmount } = req.body;

    const request = new DataRequestModel({
      partnerId: req.user._id,
      dataType,
      purpose,
      paymentAmount,
    });

    await request.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Request submitted successfully",
        data: request,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const getDataRequest = async (req, res) => {
  try {
    const requests = await DataRequestModel.find({ partnerId: req.user.id });
    res.json({ success: true, data: requests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const getAllDataRequests = async (req, res) => {
  try {
    const dataRequests = await DataRequestModel.find().populate(
      "partnerId",
      "name email"
    );
    res.status(200).json({ success: true, data: dataRequests });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const approveDataRequest = async (req, res) => {
  try {
    const dataRequest = await DataRequestModel.findByIdAndUpdate(
      req.params.id,
      { status: "approved", updatedAt: Date.now() },
      { new: true }
    );
    if (!dataRequest)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });

    res
      .status(200)
      .json({ success: true, message: "Request approved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Erorr...", error });
  }
};

const rejectDataRequest = async (req, res) => {
  try {
    const dataRequest = await DataRequestModel.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", updatedAt: Date.now() },
      { new: true }
    );
    if (!dataRequest)
      return res
        .status(404)
        .json({ success: false, message: "Request not found" });

    res
      .status(200)
      .json({ success: true, message: "Request rejected successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Erorr...", error });
  }
};

module.exports = {
  postDataRequest,
  getDataRequest,
  getAllDataRequests,
  approveDataRequest,
  rejectDataRequest,
  getUserData
};
