const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    _ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {type: Date, default: Date.now},
    expiresAt: {type: Date},
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
