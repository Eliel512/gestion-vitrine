const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    name: { type: String },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;