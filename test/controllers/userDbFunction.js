const User = require("../models/userschema.js");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const async = require("async");
const UserController = {};
UserController.create = function (req, res) {


    User.create(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            contactNumber: req.body.contactNumber,
            emailId: req.body.emailId,
            password: req.body.password

        },
        function (error, response) {
            if (error) {
                return res.status(500).json({
                    msg: false
                });
            }
            res.redirect("/user-signin");
        }
    );
};




var flag = null;
UserController.signin = function (req, res) {
    var data = req.body;

    var collection;
    User.find({ emailId: data.email }, function (err, data) {
        collection = data;

        return data;
    });
    User.findOne(
        {
            $and: [{ emailId: data.email }, { password: data.password }]
        },
        function (err, user) {
            if (err) {
                return res.status(500).send(err);
            }
            if (!user) {
                flag = false;
            } else {

                flag = true;

                session.data = user;

            }
            res.json({
                flag: flag
            });
        }
    );
};

UserController.find = function (req, res) {
    var email = req.body.email;
    User.find({ emailId: email }, function (err, data) {
        if (err || !data.length) {
            res.status(200).json({
                error: "Error"
            });
            return;
        }

        return res.status(500).json({
            success: "Success"
        });
    });
};

UserController.logout = function (request, response) {
    console.log(session.user);

    request.session.destroy(function (err) {

        setTimeout(function () { response.redirect('/'); }, 1500)
    });



};
module.exports = UserController;