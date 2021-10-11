const {
    ObjectId
} = require("bson");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    phoneNumber: Number,
    birthday: String,
    profilePic: String,
    health: ObjectId,
    appointments: ObjectId,

}, {
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);