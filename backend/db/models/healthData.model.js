const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HealthDataSchema = new Schema({
    file: [{
        type: String
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, { timestamps: true })

const HealthDataModel = mongoose.model("healthDatas", HealthDataSchema)
module.exports = HealthDataModel;