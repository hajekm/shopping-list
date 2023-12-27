const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    avatar: String,
    email: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now},
    role: {type: String, default: "user", enum: ["admin", "user"]},
    username: String,
    password: {type: String, required: true},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
