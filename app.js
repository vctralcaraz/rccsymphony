// VERSION NOTES
// Adding parts is now fixed. But viewing a part is now broken
// Also figure out how to delete pdf files
// Add image compression

var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    methodOverride = require("method-override"),
    passport   = require("passport"),
    LocalStategy = require("passport-local"),
    User       = require("./models/user"),
    flash      = require("connect-flash");

//requiring routes
var calendarRoutes  = require("./routes/calendar.js"),
    rehearsalRoutes = require("./routes/rehearsal.js"),
    mediaRoutes     = require("./routes/media.js"),
    facultyRoutes   = require("./routes/faculty.js"),
    partsRoutes     = require("./routes/parts.js"),
    userRoutes      = require("./routes/user.js"),
    indexRoutes     = require("./routes/index.js");
    
mongoose.connect("mongodb://admin:MLitbCSp!17@ds233769.mlab.com:33769/rcc_symphony");

// ==================================
//          CONFIGURATION
// ==================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Riverside City College Los Angeles Philharmonic KMGD",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//use the routes
app.use("/calendar", calendarRoutes);
app.use("/rehearsal", rehearsalRoutes);
app.use("/media", mediaRoutes);
app.use("/faculty", facultyRoutes);
app.use("/parts", partsRoutes);
app.use("/", userRoutes);
app.use("/", indexRoutes);  //keep this imported last since it contains the default '*' route

// ========================
//        C9 sERVER
// ========================
// SERVER LISTENING...
// app.listen(process.env.PORT, process.env.IP, function(){
    // console.log("Riverside City College Symphony Orchestra Web-Server is running...");
    // console.log("Bootstrap 4 is used with a CDN");
    // console.log("Goal: install Bootstrap 4 with package manager or manually (currently not easy - jQuery issues with package manager)");
// });

// ========================
//        VULTR sERVER
// ========================
// SERVER LISTENING...
app.listen(80, "45.77.112.109", function(){
    console.log("Riverside City College Symphony Orchestra Web-Server is running...");
    console.log("Bootstrap 4 is used with a CDN");
    console.log("Goal: install Bootstrap 4 with package manager or manually (currently not easy - jQuery issues with package manager)");
});