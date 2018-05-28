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

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//define allroutes
app.get("/", function (req, res) {
    res.status = 200;
    res.render("index", { title: "Index Page" });
});

app.get("/users", function (req, res) {
    res.status = 200;
    res.render('users', { users: usersdata });
});

app.get("/users/add", function (req, res) {
    res.render('adduser');
});

app.get("/users/:id", function (req, res) {
    var user = usersdata.find(user => user.id == req.params.id);
    res.render('user', { user: user });
});

app.get("/edit/:id", function (req, res) {
    var user = usersdata.find(user => user.id == req.params.id);
    res.render('edit', { user: user });
});
app.post("/edit/:id",function(req,res){
    var user = usersdata.find(user => user.id == req.params.id);
    
   
})
app.post("/users",function(req, res){
    var user= {};
    var body = req.body;
    user = body;
    user.id = usersdata.length + 1;
    usersdata.push(user);
    res.redirect("/users");
});


app.get("*", function (req, res) {
    res.status = 200;
    res.end("404. PAge not found");
});

// run server
app.listen(3000);