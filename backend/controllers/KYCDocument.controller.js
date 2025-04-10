const UserModel = require("../db/models/User.model");
const KYCDocumentModel = require("../db/models/KYCDocuments.model");
require("dotenv").config();

const postKYCDocuments = async (req, res) => {
  try {
    // console.log(req)
    const documents = req.files.map((file) => file.path);
    const kycDocumentModel = new KYCDocumentModel({
      documents,
      user: req.user._id,
    });
    await kycDocumentModel.save();
    res
      .status(201)
      .json({ message: "KYC Documents Saved Successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const getAllKYC = async (req, res) => {
  try {
    const kycDocuments = await KYCDocumentModel.find().populate(
      "user",
      "name email"
    );

    res.status(200).json({ success: true, data: kycDocuments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Erorr...", success: false });
    console.log(error);
  }
};

const approveKYC = async (req, res) => {
  try {
    const kycId = req.params.id;

    // Update KYC status in the KYC Document model
    const kycDocument = await KYCDocumentModel.findByIdAndUpdate(
      kycId,
      { kycStatus: "approved" },
      { new: true }
    ).populate("user");

    if (!kycDocument) {
      return res.status(404).json({ success: false, message: "KYC not found" });
    }

    // Update KYC status in the User model
    await UserModel.findByIdAndUpdate(kycDocument.user._id, {
      kycStatus: "approved",
    });

    res.status(200).json({
      success: true,
      message: "KYC approved successfully",
      data: kycDocument,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error approving KYC", error });
  }
};

const rejectKyc = async (req, res) => {
  try {
    const kycId = req.params.id;

    // Update KYC status in the KYC Document model
    const kycDocument = await KYCDocumentModel.findByIdAndUpdate(
      kycId,
      { kycStatus: "rejected" },
      { new: true }
    ).populate("user");

    if (!kycDocument) {
      return res.status(404).json({ success: false, message: "KYC not found" });
    }

    // Update KYC status in the User model
    await UserModel.findByIdAndUpdate(kycDocument.user._id, {
      kycStatus: "rejected",
    });

    res.status(200).json({
      success: true,
      message: "KYC rejected successfully",
      data: kycDocument,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error rejecting KYC", error });
  }
};

module.exports = {
  postKYCDocuments,
  getAllKYC,
  approveKYC,
  rejectKyc,
};