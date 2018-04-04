var express     = require("express"),
    router      = express.Router(),  //merge params
    Rehearsal    = require("../models/rehearsal");

//SHOW REHEARSAL INDEX
router.get("/", function(req, res){
    Rehearsal.find({}).sort({"date": "asc"}).exec(function(err, found){
        if(err){
            console.log("Rehearsal Error: " + err);
        } else {
            res.render("./rehearsal/index", {item: found});
        }
    });
});

//CREATE NEW REHEARSAL EVENT
router.post("/", function(req, res){
    Rehearsal.create(req.body.reh, function(err, created){
        if(err){
            console.log("Rehearsal Creation Error: " + err);
        } else {
            res.redirect("/rehearsal");
        }
    });
});

//EDIT REHEARSAL EVENT
router.put("/:id", function(req, res){
    //needs sanitize body input
    Rehearsal.findByIdAndUpdate(req.params.id, req.body.reh, function(err, updatedReh){
       if(err){
           console.log("rehearsal update error: "+err);
           res.redirect("/rehearsal");
       } else {
           res.redirect("/rehearsal");
       }
    });
});

//DESTROY REHEARSAL EVENT
router.delete("/:id", function(req, res){
    Rehearsal.findByIdAndRemove(req.params.id, function(err, deleted){
        if(err){
            console.log("Rehearsal Deletion Error: " + err);
        } else {
            res.redirect("/rehearsal");
        }
    });
});

//MIDDLEWARE


//EXPORTS *keep this last*
module.exports = router;