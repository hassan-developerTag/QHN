const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../Models/User");
const KYCDocumentModel = require("../Models/KYCDocuments");
const HealthDataModel = require("../Models/HealthData");
const DataRequestModel = require("../Models/DataRequest");
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { fullName, email, confirmPassword, role } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User is already exists.", success: false })
        }

        const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);
        const userModel = new UserModel({ name: fullName, email, password: confirmPassword, image: imagePaths, role })
        userModel.password = await bcrypt.hash(confirmPassword, 10)
        await userModel.save()
        res.status(201).json({ message: "Signup Successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        // console.log("signup VVV")
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User not exists.Authentication Failed!!!", success: false })
        }

        const passwordCheck = await bcrypt.compare(password, user.password)
        if (!passwordCheck) {
            return res.status(403).json({ message: "Password is wrong.Authentication Failed!!!", success: false })
        }

        const jwtToken = jwt.sign({ email: user.email, _id: user._id },
            process.env.JWT_ENCRYPT,
            { expiresIn: "24h" }
        )

        res.status(201).json({ message: "Login Successfully", success: true, jwtToken, email, name: user.name, role: user.role })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const postKYCDocuments = async (req, res) => {
    try {
        // console.log(req)
        const documents = req.files.map((file) => `/uploads/${file.filename}`);
        const kycDocumentModel = new KYCDocumentModel({ documents, user: req.user._id })
        await kycDocumentModel.save()
        res.status(201).json({ message: "KYC Documents Saved Successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const getAllKYC = async (req, res) => {
    try {
        const kycDocuments = await KYCDocumentModel.find().populate("user", "name email");

        res.status(200).json({ success: true, data: kycDocuments, });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const approveKYC = async (req, res) => {
    try {
        const kycId = req.params.id;

        // Update KYC status in the KYC Document model
        const kycDocument = await KYCDocumentModel.findByIdAndUpdate(kycId, { kycStatus: "approved" }, { new: true }).populate("user");

        if (!kycDocument) {
            return res.status(404).json({ success: false, message: "KYC not found" });
        }

        // Update KYC status in the User model
        await UserModel.findByIdAndUpdate(kycDocument.user._id, { kycStatus: "approved", });

        res.status(200).json({ success: true, message: "KYC approved successfully", data: kycDocument, });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error approving KYC", error });
    }
}

const rejectKyc = async (req, res) => {
    try {
        const kycId = req.params.id;

        // Update KYC status in the KYC Document model
        const kycDocument = await KYCDocumentModel.findByIdAndUpdate(kycId, { kycStatus: "rejected" }, { new: true }).populate("user");

        if (!kycDocument) {
            return res.status(404).json({ success: false, message: "KYC not found" });
        }

        // Update KYC status in the User model
        await UserModel.findByIdAndUpdate(kycDocument.user._id, { kycStatus: "rejected", });

        res.status(200).json({ success: true, message: "KYC rejected successfully", data: kycDocument, });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error rejecting KYC", error });
    }
}

const postHealthData = async (req, res) => {
    try {
        // console.log(req)
        const file = req.files.map((file) => `/uploads/${file.filename}`);
        const healthDataModel = new HealthDataModel({ file, user: req.user._id })
        await healthDataModel.save()
        res.status(201).json({ message: "Health Data Saved Successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const getHealthData = async (req, res) => {
    try {
        const healthData = await HealthDataModel.find({ user: req.user._id }).populate("user", "name email");

        res.status(200).json({ success: true, data: healthData, });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const postDataRequest = async (req, res) => {
    try {
        const { dataType, purpose, paymentAmount } = req.body;

        const request = new DataRequestModel({ partnerId: req.user._id, dataType, purpose, paymentAmount });

        await request.save();
        res.status(201).json({ success: true, message: "Request submitted successfully", data: request });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const getDataRequest = async (req, res) => {
    try {
        const requests = await DataRequestModel.find({ partnerId: req.user.id });
        res.json({ success: true, data: requests });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const getAllDataRequests = async (req, res) => {
    try {
        const dataRequests = await DataRequestModel.find().populate("partnerId", "name email");
        res.status(200).json({ success: true, data: dataRequests });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Erorr...", success: false })
        console.log(error)
    }
}

const approveDataRequest = async (req, res) => {
    try {
        const dataRequest = await DataRequestModel.findByIdAndUpdate(req.params.id, { status: "approved", updatedAt: Date.now() }, { new: true });
        if (!dataRequest) return res.status(404).json({ success: false, message: "Request not found" });

        res.status(200).json({ success: true, message: "Request approved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Erorr...", error });
    }
}

const rejectDataRequest = async (req, res) => {
    try {
        const dataRequest = await DataRequestModel.findByIdAndUpdate(req.params.id, { status: "rejected", updatedAt: Date.now() }, { new: true });
        if (!dataRequest) return res.status(404).json({ success: false, message: "Request not found" });

        res.status(200).json({ success: true, message: "Request rejected successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Erorr...", error });
    }
}

module.exports = {
    signup, login, postKYCDocuments, getAllKYC, approveKYC, rejectKyc, postHealthData, getHealthData, postDataRequest, getDataRequest, getAllDataRequests, approveDataRequest, rejectDataRequest
}