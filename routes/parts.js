var express     = require("express"),
    multer      = require("multer"),
    fs          = require("fs"),
    Image       = require("../models/image"),
    Pdf         = require("../models/pdf"),
    Part        = require("../models/parts"),
    router      = express.Router();


// INSTRUMENT PDF UPLOADER
var partsUpload = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "./public/uploads/parts");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
            
        var obj = {
            name: req.body.part.instrument['name'],
            url: "./uploads/parts/" + file.originalname
        }
        
        console.log('object name: ' + obj.name);
        Part.findByIdAndUpdate(req.params.id, {$push: {instrument: obj}}, function(err){
            if(err){
                console.log("Instrument Upload Error: " + err);
            }
        });
    }
});

var partsUploader = multer({
    storage: partsUpload,
    fileFilter: function(req, file, callback){
        if(file.mimetype !== 'application/pdf') {
            req.flash("error", "That is not a pdf");
            return callback(null, false);
        }
        callback(null, true);
    }
}).array("instrumentFile", 1); // Field name and max count

//Show parts index
router.get("/", function(req, res){
    // Image.find({}).sort({"_id": 'desc'}).exec(function(err, found){
    //     if(err){
    //         console.log("Image Finding Error: " + err);
    //     } else {
    //         Pdf.find({}, function(err, pdfFound){
    //             if(err){
    //                 console.log("PDF Finding Error: " + err);
    //             } else {
    //                 res.render("./parts/index", {images: found, pdfs: pdfFound});
    //             }
    //         });
    //     }
    // });
    Part.find({}, function(err, found){
        if(err){
            console.log("Parts Finding Error: " + err);
        } 
        
        if(found){
            res.render("./parts/index", {parts: found});
        } else {
            req.flash('error', 'Something went wrong when loading all the parts');
            res.render('./parts/index');
        }
    });
});

// ADDING MUSIC TITLE
router.post("/title", function(req, res){
    if(req.body.part.title === ""){
        req.flash("error", "You must not leave the music group name field blank");
        return res.redirect("/parts");
    }
    Part.create(req.body.part, function(err){
        if(err){
            console.log("Music Title Error: " + err);
            req.flash('error', 'Something went wrong with creating the music group');
        } else {
            req.flash('success', 'You succefully created the music group - ' + req.body.part.title);
        }
        res.redirect("/parts");
    });
});

// PDF VIEW ROUTE
router.get("/pdf/:id", function(req, res){
    Pdf.findById(req.params.id, function(err, found){
        if(err){
            console.log("PDF Find Error: " + err);
        } else {
            // res.render("./parts/pdf/show", {pdf: found});
            fs.readFile(__dirname + "/public" + found.url.substr(1,found.url.length - 1), function(err, data){
                if(err){
                    console.log("PDF Show Error: " + err);
                } else {
                    res.contentType("application/pdf");
                    res.send(data);
                }
            });
        }
    });
});

//Create Instrument
router.post("/:id", function(req, res){
    console.log("File is uploading...");
    // console.log(req.body.part['instrument']['name']);
    // if(req.body.part.instrument.name.value == ""){
    //     req.flash("error", "You must not leave the instrument name field blank");
    //     return res.redirect("/parts");
    // }
    partsUploader(req, res, function(err){
        if(err){
            console.log("Instrument Upload Error: " + err);
        } else {
            console.log("File is done uploading.");
            res.redirect("/parts");
        }
    })
});

const parse = item => item.lastIndexOf('site');

//Show PDFs i think
router.get("/:id/:name", function(req, res){
    Part.findById(req.params.id, function(err, found){
        if(err){
            console.log("Instrument Find Error: " + err);
            req.flash('error', 'Something went wrong with the PDF');
            res.redirect('/parts');
        } else {
            var elementPos = found.instrument.map(function(x) {return x.name; }).indexOf(req.params.name);
            var objectFound = found.instrument[elementPos];
            fs.readFile(__dirname.substr(0, parse(__dirname) + 4) + "/public" + objectFound.url.substr(1), function(err, data){
                if(err){
                    console.log("PDF Show Error: " + err);
                }
                if(data){
                    res.contentType("application/pdf");
                    res.send(data);
                }
            });
        }
    });
});

router.delete('/:id/:name', function(req, res){
    Part.findById(req.params.id, function(err, found){
        if(err){
            console.log('part finding Error: ' + err);
            req.flash('error', 'Something went wrong when trying to find the Music Group ' + found.title);
            res.redirect('/parts');
        }
        Part.findByIdAndUpdate(req.params.id, {$pull: {'instrument': {'name': req.params.name}}}, function(err){
            if(err){
                console.log("PDF Deletion Error: " + err);
                req.flash("error", 'Something went wrong when trying to delete that instrument');
            }
            req.flash('success', 'The instrument was deleted successfully');
            res.redirect('/parts');
        });
    });
});



//EXPORTS *keep this last*
module.exports = router;