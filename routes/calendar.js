var express     = require("express"),
    router      = express.Router(),  
    Calendar    = require("../models/calendar");

// SHOW CALENDAR INDEX
router.get("/", function(req, res){
    //Get all calendar items from db
    Calendar.find({}).sort({"date": "asc"}).exec(function(err, found){
        if(err){
            console.log("Calendar Error: " + err);
        } else {
            res.render("./calendar/index", {calendar: found});
        }
    });
});

// CREATE CALENDAR EVENTS
router.post("/", function(req, res){
    if(req.body.cal.date === "" || req.body.cal.description === ""){
        req.flash("error", "You must not leave any fields blank");
        return res.redirect("/calendar");
    }
    Calendar.create(req.body.cal, function(err, newlyCreated){
      if(err){
            console.log(err);
      }else{
            res.redirect("/calendar");
      }
    });
});

//EDIT CALENDAR EVENT
router.put("/:id", function(req, res){
    //needs sanitize body input
    if(req.body.cal.date === "" || req.body.cal.description === ""){
        req.flash("error", "You must not leave any fields blank");
        return res.redirect("/calendar");
    }
    Calendar.findByIdAndUpdate(req.params.id, req.body.cal, function(err, updatedCal){
      if(err){
          console.log("calendar update error: "+err);
          res.redirect("/calendar");
      } else {
          res.redirect("/calendar");
      }
    });
});

//DESTROY CALENDAR EVENT
router.delete("/:id", function(req, res){
    Calendar.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err){
            console.log("Calendar Deletion Error: " + err);
        } else {
            res.redirect("/calendar");
        }
    });
});

//MIDDLEWARE


//EXPORTS *keep this last*
module.exports = router;