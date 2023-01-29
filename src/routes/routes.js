const express = require("express");
const defaultRoute = require("../controllers/defaultController");

//? define router
const router = express.Router();

/* Application routes */

//? default api
router.get("/", defaultRoute)

module.exports = router;