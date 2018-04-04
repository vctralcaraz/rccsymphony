var express     = require("express"),
    router      = express.Router(),
    multer      = require("multer"),
    Faculty    = require("../models/faculty");

// FACULTY ROUTES
router.get("/", function(req,res){
    Faculty.find({}, function(err, found){
        if(err){
            console.log("Faculty Finding Error: " + err);
        } else {
            res.render("./faculty/index", {faculty: found});
        }
    });
});

// CREATE NEW FACULTY ROUTE
router.post("/", function(req,res){
    facUpload(req, res, function(err){
        if(err){
            console.log("Faculty Image Upload Error: " + err);
        } else {
            res.redirect("/faculty");
        }
    });
});

// FACULTY SHOW ROUTE
router.get("/:name", function(req, res){
    var dash = req.params.name.indexOf('-');
    var name = {
        first: req.params.name.substr(0, dash),
        last: req.params.name.substr(dash + 1, req.params.name.length)
    }
    Faculty.findOne({ "first": name.first, "last": name.last }, function(err, found){
        if(err){
            console.log("Faculty Show Error: " + err);
        } else {
            res.render("./faculty/show", { person: found});
        }
    });
});

// FACULTY EDIT ROUTE
router.get("/:name/edit", function(req, res){
    var dash = req.params.name.indexOf('-');
    var name = {
        first: req.params.name.substr(0, dash),
        last: req.params.name.substr(dash + 1, req.params.name.length)
    }
    Faculty.findOne({ "first": name.first, "last": name.last }, function(err, found){
        if(err){
            console.log("Faculty Edit Error: " + err);
        } else {
            res.render("./faculty/edit", { person: found});
        }
    });
});

// FACULTY UPDATE ROUTE
router.put("/:name", function(req, res){
    var dash = req.params.name.indexOf('-');
    var name = {
        first: req.params.name.substr(0, dash),
        last: req.params.name.substr(dash + 1, req.params.name.length)
    }
    Faculty.findOneAndUpdate({ "first": name.first, "last": name.last }, req.body.falc, function(err, found){
        if(err){
            console.log("Faculty Update Error: " + err);
        } else {
            res.redirect("/faculty/" + req.params.name);
        }
    })
});

//DESTROY FACULTY MEMBER
router.delete("/:id", function(req, res){
    Faculty.findByIdAndRemove(req.params.id, function(err, found){
        if(err){
            console.log("Faculty Remove Error: " + err);
        } else {
            res.redirect("/faculty");
        }
    });
});

// FACULTY IMAGE UPLOADER
var FacultyImages = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./public/uploads/images/faculty");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
        var obj = {
            portrait: "./uploads/images/faculty/" + file.originalname
        }
        req.body.falc.portrait = obj.portrait;
        Faculty.create(req.body.falc, function(err){
            if(err){
                console.log("Faculty Creation Error: " + err);
            }
        });
    }
});

var facUpload = multer({
    storage: FacultyImages,
    fileFilter: function(req, file, callback){
        if(file.mimetype !== 'image/jpeg') {
            req.flash("error", "That is not a image");
            return callback(null, false);
        }
        callback(null, true);
    }
}).array("portraitUpload", 1);

module.exports = router;