var express     = require("express");
var router      = express.Router();  
var Calendar    = require("../models/calendar");

//SHOW MEDIA VIDEO INDEX
router.get("/video", function(req, res){
    res.render("./media/video");
});

//SHOW MEDIA PAST INDEX
router.get("/past", function(req, res){
    var today = new Date();
    today.setDate(today.getDate() - 2);
    Calendar.find({"date": {$lt: today}}).sort({"date": "desc"}).exec(function(err, found){
        if(err){
            console.log("Calendar Error: " + err);
        } else {
            res.render("./media/past", {calendar: found});
        }
    });
});

//EXPORTS *keep this last*
module.exports = router;