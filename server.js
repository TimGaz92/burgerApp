var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: false }));


app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.creareConnection(process.env.JAWSDB_URL);
}else{
connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "advictoriam",
  database: "burgers_db2"
});
};

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Serve index.handlebars to the root route.
app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgerTbl;", function(err, data) {
    if (err) {
      throw err;
    }
    console.log("select all");
    res.render("index", { burgers: data });
  });
}); //functioning

app.post("/", function(req, res) {
  connection.query("INSERT INTO burgerTbl (name) VALUES (?)", [
    req.body.name
  ], function(err, result) {
    if (err) {
      throw err;
    }
    console.log("insert");
    res.redirect("/");
  });
}); //NOT FUNCTIONING

app.delete("/:id", function(req, res) {
  connection.query("DELETE FROM burgerTbl WHERE id = ?", [req.params.id], function(err, result) {
    if (err) {
      throw err;
    }
    console.log("delete");
    res.redirect("/");
  });
});//functioning 1002AM


app.get("/:id", function(req, res) {
  connection.query("SELECT * FROM burgerTbl where id = ?", [req.params.id], function(err, data) {
    if (err) {
      throw err;
    }

    console.log("select by id" + data);
    res.render("single-burger", data[0]);
  });
});


app.put("/:id", function(req, res) {
  connection.query("UPDATE burgerTbl SET name = ? WHERE id = ?", [
    req.body.name,  req.params.id
  ], function(err, result) {
    if (err) {
      throw err;
    }
    console.log("update by id functioning");
    res.redirect("/");
  });
}); //this works - functioning 1002AM



app.listen(port, function() {
  console.log("active on: " + port);
});
