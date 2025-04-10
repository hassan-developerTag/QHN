const HealthDataModel = require("../db/models/healthData.model");
require("dotenv").config();

const postHealthData = async (req, res) => {
  try {
    // console.log(req)
    const file = req.files.map((file) => file.path);
    const healthDataModel = new HealthDataModel({ file, user: req.user._id });
    await healthDataModel.save();
    res
      .status(201)
      .json({ message: "Health Data Saved Successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const getHealthData = async (req, res) => {
  try {
    const healthData = await HealthDataModel.find({
      user: req.user._id,
    }).populate("user", "name email");

    res.status(200).json({ success: true, data: healthData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

module.exports = {
  postHealthData,
  getHealthData,
};
