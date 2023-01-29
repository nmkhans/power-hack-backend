const express = require("express");
const { createBilling, getBillingList, updateBilling } = require("../controllers/billingController");
const defaultRoute = require("../controllers/defaultController");
const { registerUser, loginUser } = require("../controllers/userController");

//? define router
const router = express.Router();

/* Application routes */

//? default api
router.get("/", defaultRoute)

//? register a user
router.post("/registration", registerUser)

//? login user
router.post("/login", loginUser)

//? create billing
router.post("/add-billing", createBilling)

//? get billing list
router.get("/billing-list", getBillingList)

//? update billing
router.put("/update-billing/:id", updateBilling)

module.exports = router;