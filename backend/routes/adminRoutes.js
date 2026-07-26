const express = require("express");
const router = express.Router();

const {
    getMessages,
    getMessage,
    deleteMessage
} = require("../controllers/adminController");

// Get all messages
router.get("/messages", getMessages);

// Get one message
router.get("/message/:id", getMessage);

// Delete message
router.delete("/message/:id", deleteMessage);

module.exports = router;