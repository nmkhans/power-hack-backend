const Billing = require("../models/billingModel");

const createBilling = async (req, res) => {
    try {
        const data = req.body;
        const result = await Billing.create(data);

        res.status(201).json({
            success: true,
            message: "Billing successfully added.",
            data: result
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            message: "There was a server side error!"
        })
    }
}

module.exports = {
    createBilling
}