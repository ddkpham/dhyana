const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  first_name: { type: String, trim: true, required: true, minlength: 2 },
  last_name: { type: String, trim: true, required: true, minlength: 2 },
  email: { type: String, trim: true, default: "" },
  phone_number: { type: Number, default: 0 },
  notes: { type: String, trim: true, default: "" },
  username: { type: String, trim: true, minlength: 2 },
  password: { type: String, trim: true, minlength: 2 },
});

module.exports = mongoose.model("contact", Contact, "contacts");
