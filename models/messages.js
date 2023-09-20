const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MsgSchema = new Schema({
    title: { type: String, required: true},
    time: { type: Date, default: Date.now, required: true},
    text: { type: String, required: true},
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

module.exports = mongoose.model("Msg", MsgSchema);