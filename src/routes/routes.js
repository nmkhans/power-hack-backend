const express = require("express");
const { createBilling } = require("../controllers/billingController");
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

module.exports = router;