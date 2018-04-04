var express     = require("express"),
    router      = express.Router(),  //merge params
    Calendar    = require("../models/calendar");
    
//GENERAL ROUTES

// ROOT ROUTES
router.get("/home", function(req, res){
    var today = new Date();
    today.setDate(today.getDate() - 2);
    Calendar.find({"date": {$gte: today}}).sort({"date": "asc"}).exec(function(err, found){
        if(err){
            console.log("Calendar Error: " + err);
        } else {
            res.render("index", {calendar: found});
        }
    });
});

router.get("/", function(req, res){
    res.redirect("/home");
})


//404 ERROR PAGE ROUTE
router.get("*", function(req,res){
    res.render("default");
});

//EXPORTS *keep this last*
module.exports = router;