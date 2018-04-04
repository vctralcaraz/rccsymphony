var mongoose = require("mongoose");
//SCHEMA SETUP
var pdfSchema = new mongoose.Schema({
    name: String,
    url: String
});

module.exports = mongoose.model("PDF", pdfSchema);