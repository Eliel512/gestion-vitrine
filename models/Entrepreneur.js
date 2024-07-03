const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    nationality: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    status: { type: String, required: true }, // "active" or "considering"
    sector: { type: String, required: true },
    experience: { type: Number, required: true } // years of business experience
});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;