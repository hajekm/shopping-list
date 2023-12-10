const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  _ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "new", enum: ["new", "done", "cancelled"] },
  note: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
