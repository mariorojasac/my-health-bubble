const mongoose = require('mongoose')
const Schema = mongoose.Schema


const logSchema = new Schema({
    activity: String,
    meals: String,
    weight: Number,
    symptoms: String,
}, {
    timestamps: true
})


module.exports = mongoose.model('Log', logSchema)