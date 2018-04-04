var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user");

var registeringNow = true;

// ==================================
//          SEEDING USER
// ==================================
// router.get("/login", function(req, res){
//     res.render("./fast-log");
// });

// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect: "/home",
//         failureRedirect: "/home"
        
//     }), function(req, res) {
// });

//USER ROUTES
router.get("/user/admin/login", function(req, res){
    res.render("./enter/index");
});

router.get("/user/admin/login/register", function(req, res){
    if(registeringNow){
        res.render("./enter/reg");
    } else {
        req.flash("error", "There is no registering at this time");
        res.redirect("/user/admin/login");
    }
});

// handling login logic
router.post("/user/admin/login", passport.authenticate("local",
    {
        successRedirect: "/home",
        failureRedirect: "/user/admin/login"
        
    }), function(req, res) {
});

// handling sign up logic
router.post("/user/admin/login/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/user/admin/login/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome, " + user.username + ". You now have admin rights.");
            res.redirect("/home");
        });
    });
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/home");
});

//EXPORTS *keep this last*
module.exports = router;