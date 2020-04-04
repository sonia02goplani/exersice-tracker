const registrationRoutes = require('express').Router();
let User = require('../models/users.model');
const bcrypt = require("bcrypt");

//NOTE  Registration route
registrationRoutes.route('/register').post(function(req, res) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const user_name = req.body.user_name;
    const password = req.body.password;
    let register = new User({first_name,last_name, user_name, password});
    register.save()
        .then(reg => {
            res.sendStatus(200);
        })
        .catch(err => {
            res.status(400).send("Failed to store to database");
        });
});

// Login Router
registrationRoutes.route("/login").post(function(req, res) {
    User.findOne({ user_name: req.body.user_name })
        .then(user => {
            console.log("User from login", user.user_name)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});


// Username validation Router
registrationRoutes.route('/validate')
    .post(function(req, res) {
        User.findOne({ user_name: req.body.user_name })
            .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
    });

// Get allData
registrationRoutes.route('/data').get(function(req, res) {
    User.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});

module.exports = registrationRoutes;

 
