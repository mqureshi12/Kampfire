var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Root Route
router.get("/", function(req, res){
    res.render("landing")
});

// Authentication Routes 
// ----------------------

// Show the Form Register
router.get("/register", function(req, res){
    res.render("register", {page: 'register'}); 
});
// Sign Up Logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === "Z5RY9Z3y5cmsOkii"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Kampfire, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});
// Show Login Form
router.get("/login", function(req, res){
    res.render("login", {page: 'login'}); 
});
// Login Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"

    }), function(req, res){
});
// Logout Logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds");
});

module.exports = router;