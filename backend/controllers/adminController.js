const Contact = require("../models/Contact");

// Get all messages
const getMessages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get one message and mark as read
const getMessage = async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        res.json(message);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete message
const deleteMessage = async (req, res) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                message: "Message not found"
            });
        }

        await message.deleteOne();

        res.json({
            success: true,
            message: "Message deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getMessages,
    getMessage,
    deleteMessage
};