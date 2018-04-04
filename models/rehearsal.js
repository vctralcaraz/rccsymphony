var mongoose = require("mongoose");

var rehearsalSchema = new mongoose.Schema({
    info: String,
    date: Date
});

module.exports = mongoose.model("Rehearsal", rehearsalSchema);