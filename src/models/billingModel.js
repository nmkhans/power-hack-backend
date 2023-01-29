const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    paidAmount: {
        type: Number,
        required: true
    }

}, { versionKey: false, timestamps: true })

const Billing = mongoose.model("billing", schema);
module.exports = Billing