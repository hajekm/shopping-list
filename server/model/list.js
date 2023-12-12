const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  _ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  items: {
    type: Array,
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    _ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    status: {
      type: String,
      default: "new",
      enum: ["new", "done", "cancelled"],
    },
    note: String,
  },
  members: {
    type: Array,
    avatar: String,
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, default: "user", enum: ["admin", "user"] },
    username: String,
  },
  status: { type: String, default: "new", enum: ["new", "done", "cancelled"] },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
