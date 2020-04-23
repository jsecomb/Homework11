var express = require("express");
var path = require("path");
var fs = require("fs");
var data = require("./db/db.json");

var app = express();
var PORT = 4500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/api/notes", function (req, res) {
    return res.json(data);
});

app.post("/api/notes", function (req, res) {
    var note = req.body;
    note.id = data.length;
    data.push(note);
    assignIds();
    fs.writeFile("./db/db.json", JSON.stringify(data), function (err) {
        if (err) return console.log(err);
    });
});

app.delete("/api/notes/:id", function (req, res) {
    data.splice(req.params.id - 1, 1);
    assignIds();
    fs.writeFile("./db/db.json", JSON.stringify(data), function (err) {
        if (err) return console.log(err);
    });
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
  });
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

function assignIds() {
  let i=1;
  data.forEach(element => {
    element.id = i;
    i++;
  });
}