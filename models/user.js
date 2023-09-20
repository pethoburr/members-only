const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true},
    last_name: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    member_status: { type: Boolean, },
    admin: { type: Boolean, }
})

UserSchema.virtual("url").get(function () {
    return `/members/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema);