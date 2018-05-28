var express = require("express"),
    ejs = require("ejs"),
    path = require("path"),
    bodyparser = require("body-parser");

//initialize server/app
var app = express();

var usersdata = require("./store/users.js");

// change server settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(express.static(path.join(__dirname, "assets")))

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));

//define allroutes
app.get("/", function (req, res) {
    res.status = 200;
    res.render("index", { title: "Index Page" });
});

app.get("/users", function (req, res) {
    res.status = 200;
    res.render('users', { users: usersdata });
});

app.get("*", function (req, res) {
    res.status = 200;
    res.end("404. PAge not found");
});

// run server
app.listen(3000);