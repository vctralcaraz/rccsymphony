var mongoose = require("mongoose");
//SCHEMA SETUP
var imageSchema = new mongoose.Schema({
    name: String,
    url: String
});

module.exports = mongoose.model("Image", imageSchema);