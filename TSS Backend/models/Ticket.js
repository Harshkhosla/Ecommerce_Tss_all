const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  tid: { type: String, unique: true, required: true },
  uid: { type: String, required: true },
  userName: { type: String, required: true },
  subject: { type: String, required: true },
  messages: [
    {
      role: { type: String, required: true }, 
      message: { type: String, required: true }, 
      date: { type: String, default: () => new Date().toLocaleDateString("en-GB") }, 
      time: { type: String, default: () => new Date().toLocaleTimeString("en-US", { hour12: false }) } 
    }
  ],
  status: { type: String, enum: ["open", "in-progress", "closed"], default: "open" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", ticketSchema);
