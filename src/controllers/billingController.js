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

const getBillingList = async (req, res) => {
    try {
        const { pageno, perpage, search } = req.query;
        const pageNo = parseInt(pageno);
        const perPage = parseInt(perpage);
        const skipRow = (pageNo - 1) * perPage

        if (search) {
            const searchRegx = { $regex: search, $options: "i" };
            const searchQuery = {
                $or: [
                    { name: searchRegx },
                    { email: searchRegx },
                    { phone: searchRegx }
                ]
            }

            const result = await Billing.aggregate([
                { $match: searchQuery },
                { $skip: skipRow },
                { $limit: perPage }
            ])

            res.status(200).json({
                success: true,
                message: "Searched billing data",
                data: result
            })
        } else {
            const result = await Billing.aggregate([
                { $skip: skipRow },
                { $limit: perPage }
            ])

            res.status(200).json({
                success: true,
                message: "All billing data",
                data: result
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "There was a server side error!"
        })
    }
}

module.exports = {
    createBilling,
    getBillingList
}