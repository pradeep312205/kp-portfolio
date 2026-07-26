const express = require("express");
const router = express.Router();

const { saveContact } = require("../controllers/contactController");

// POST /api/contact
router.post("/", saveContact);

module.exports = router;