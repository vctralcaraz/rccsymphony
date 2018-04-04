var mongoose = require("mongoose");
//SCHEMA SETUP
var FacultySchema = new mongoose.Schema({
    first: String,
    last: String,
    title: String,
    phone: String,
    email: String,
    info: String,
    portrait: String
});

module.exports = mongoose.model("Faculty", FacultySchema);