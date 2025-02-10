const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DataRequestSchema = new Schema({
    partnerId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    dataType: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    paymentAmount: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const DataRequestModel = mongoose.model("dataRequests", DataRequestSchema)

module.exports = DataRequestModel;