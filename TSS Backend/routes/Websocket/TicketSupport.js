const express = require("express");
const mongoose = require('mongoose');
const Ticket = require("../../models/Ticket");
const User = require("../../models/User");

const router = express.Router();

router.post("/createticket", async (req, res) => {
    try {
        const { uid, subject, usname, role, msg } = req.body;

        if (!uid || !subject || !usname || !role || !msg) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        const formattedMessages = [
            {
                role: role,  
                message: msg, 
            }
        ];

        const newTicket = new Ticket({
            tid: uid,
            uid,
            userName: usname,
            subject,
            status: "open",
            messages: formattedMessages, 
        });

        await newTicket.save();

        res.json({ success: true, message: "Ticket created successfully", ticket: newTicket });
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ success: false, message: "Failed to create ticket", error: error.message });
    }
});




router.get("/gettickets", async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json({ success: true, tickets });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ success: false, message: "Failed to fetch tickets", error: error.message });
    }
});


router.post("/getticket", async (req, res) => {
    try {
        const { tid } = req.body;

        if (!tid) {
            return res.status(400).json({ success: false, message: "Missing ticket ID (tid)" });
        }

        const ticket = await Ticket.findOne({ tid });

        if (!ticket) {
            return res.status(202).json({ success: false, message: "Ticket not found" });
        }

        res.json({ success: true, ticket });
    } catch (error) {
        console.error("Error fetching ticket:", error);
        res.status(500).json({ success: false, message: "Failed to fetch ticket", error: error.message });
    }
});




router.post("/updateticket", async (req, res) => {
    try {
        const { tid, status } = req.body;

        if (!tid || !status) {
            return res.status(400).json({ success: false, message: "Missing ticket ID or status" });
        }

        const updatedTicket = await Ticket.findOneAndUpdate({ tid }, { status }, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ success: false, message: "Ticket not found" });
        }

        res.json({ success: true, message: "Ticket updated successfully", ticket: updatedTicket });
    } catch (error) {
        console.error("Error updating ticket:", error);
        res.status(500).json({ success: false, message: "Failed to update ticket", error: error.message });
    }
});







module.exports = router;