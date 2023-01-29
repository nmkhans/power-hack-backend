const express = require("express");
const { createBilling, getBillingList, updateBilling, deleteBilling, getTotalBill } = require("../controllers/billingController");
const defaultRoute = require("../controllers/defaultController");
const { registerUser, loginUser } = require("../controllers/userController");
const verifyUser = require("../middleware/verifyUser");

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
router.post("/add-billing", verifyUser, createBilling)

//? get billing list
router.get("/billing-list", verifyUser, getBillingList)

//? update billing
router.put("/update-billing/:id", verifyUser, updateBilling)

//? delete billing
router.delete("/delete-billing/:id", verifyUser, deleteBilling)

router.get("/get-total-bill", getTotalBill)

module.exports = router;