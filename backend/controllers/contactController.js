const Contact = require("../models/Contact");

// Save Contact Form


const saveContact = async (req, res) => {
    try {
        console.log("📩 Received:", req.body);

        const { name, email, subject, message } = req.body;

        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        const savedContact = await contact.save();

        console.log("✅ Saved:", savedContact);

        res.status(201).json({
            success: true,
            message: "Message sent successfully!"
        });

    } catch (error) {
        console.error("❌ Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = { saveContact };

module.exports = {
    saveContact
};