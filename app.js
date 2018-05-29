var express = require("express"),
    ejs = require("ejs"),
    path = require("path"),
    methodOverride = require("method-override"),
    bodyparser = require("body-parser");
mysql = require('mysql');
//initialize server/app
var app = express();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeapp'
});
var usersdata = [];
var reslt;
connection.connect();



// change server settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
app.use(express.static(path.join(__dirname, "assets")));
app.use(methodOverride('method'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//define allroutes
app.get("/", function (req, res) {
    res.status = 200;
    res.render("index", { title: "Index Page" });
});

app.get("/users", function (req, res) {
    connection.query('SELECT * from users', function (error, results, fields) {
        if (error) throw error;
        userdata = results;
        console.log("USERS:", results);
        res.status = 200;
        res.render('users', { users: userdata });
    });

});

app.get("/users/add", function (req, res) {
    res.render('adduser');
});

app.get("/users/:id", function (req, res) {
    var id = req.params.id;
    connection.query('SELECT * from users  WHERE id=?', [id], function (error, results, fields) {
        if (error) throw error;
        userdata = results;
        console.log("USERS:", results);
        res.status = 200;
        res.render('user', { user: userdata[0] });
    });
});

app.get("/edit/:id", function (req, res) {
    var id = req.params.id;
    connection.query('SELECT * from users  WHERE id=?', [id], function (error, results, fields) {
        if (error) throw error;
        userdata = results;
        console.log("USERS:", results);
        res.status = 200;
        res.render('edit', { user: userdata[0] });
    });
});
app.post("/update/:id", function (req, res) {
    var id = req.params.id, user = req.body;
    connection.query('UPDATE users SET name= ?,email=?,username=?,phone=? WHERE id=?',[user.name,user.email,user.username,user.phone,id], function (error, results, fields) {
        if (error) throw error;
        // userdata = results;
        console.log(user);
        // res.status = 200;
  //   res.redirect("/users");
    });
   // res.json(user);
})
app.post("/users", function (req, res) {
    var user = {};
    var body = req.body;
    user = body;
    var sql = "INSERT INTO users SET ?";
    connection.query(sql, user, function (err, result, fields) {
        //  if (err) throw err;
        // console.log("1 record inserted, ID: " + result.insertId);
    });
    res.redirect("/users");
    //user.id = usersdata.length + 1;
    // usersdata.push(user);
    // res.redirect("/users");
});

app.delete("/deluser/:id", (req, res) => {
    var id = req.params.id;
     connection.query('DELETE from users  WHERE id=?', [id], function (error, results, fields) {
        if (error) throw error;
       // userdata = results;
        //console.log("USERS:", results);
        res.status = 200;
       res.redirect("/users");
    });
    //res.end('User with ' + id + ' deleted.');
});

app.put("/updateuser/:id", (req, res) => {
    var id = req.params.id;
    res.end('User with ' + id + ' deleted.');
});

app.get("*", function (req, res) {
    res.status = 200;
    res.end("404. PAge not found");
});

// run server
app.listen(3000);