var mongoose = require("mongoose");
//SCHEMA SETUP
var partsSchema = new mongoose.Schema({
    title: String,
    instrument: []
});

module.exports = mongoose.model("Part", partsSchema);