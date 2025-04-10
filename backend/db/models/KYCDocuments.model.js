const mongoose = require("mongoose")
const Schema = mongoose.Schema

const KYCDocumentSchema = new Schema({
    documents: [{
        type: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    kycStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
}, { timestamps: true })

const KYCDocumentModel = mongoose.model("kycdocuments", KYCDocumentSchema)
module.exports = KYCDocumentModel;