
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const Handlebars = require('handlebars')
var cookieParser = require("cookie-parser");
const session = require("express-session");
var passport = require("passport");
const PORT = 9091;
const userControllers = require("./controllers/userDbFunction.js");
const eventControllers = require("./controllers/eventDbFunction.js");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
const hbs = exphbs.create({
    extname: ".hbs",

});
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.get('/', function (request, response) {

    return response.render('homepage', {
        user: session.data
    });
})
app.get("/user-login", function (request, response) {
    response.render('signup');
})
app.get("/user-signin", function (request, response) {
    response.render('signin');
})
app.get("/eventRegistration", function (request, response) {
    response.render('eventRegistration');
})
app.post("/user_create", userControllers.create);
app.post("/user_login", userControllers.signin);
app.post("/event_create", eventControllers.create);
app.get("/event_get", eventControllers.get);
app.get("/user_logout", userControllers.logout);
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://eagle-ecommerce-app:eagle-ecommerce-app@ecommerce-app-ll9yl.mongodb.net/ecommerce-app?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

//session configuration
app.use(session({
    name: 'book',
    resave: false,
    saveUnintialized: true,
    secret: 'sitanshu123',
    cookie:
    {
        httpOnly: true,
        maxAge: 120000,
        path: '/',
        sameSite: true,
        secure: false
    }
}));



app.use("/public", express.static("public"));

let db = mongoose.connection;

// check DB connection
db.once("open", function () {
    console.log("connected to mongodb");
});

//check for DB errors
db.on("error", function (err) {
    console.log(err);
});


app
    .listen(PORT, function () {
        console.log("Started : ", PORT);
    })
    .on("error", function (err) {
        console.log("Unable To Start App >>>", err);
    });
