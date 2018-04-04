var mongoose = require("mongoose");
//SCHEMA SETUP
var calendarSchema = new mongoose.Schema({
    date: {type: Date},
    description: String
});

module.exports = mongoose.model("Calendar", calendarSchema);