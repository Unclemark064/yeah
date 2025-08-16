const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const https = require("https");
const bodyParser = require("body-parser");
const { log } = require("console");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs"); // Corrected here
var itemsArray = [];
var workArray = [];
app.get("/", function (req, res) {
  const today = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { listtittle: day, itemsArray: itemsArray, route: "/" });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if (item.trim() !== "") {
    itemsArray.push(item);
  }
  res.redirect("/");
});
app.get("/work", function (req, res) {
  res.render("list", {
    listtittle: "Work List",
    itemsArray: workArray,
    route: "/work",
  });
});

app.post("/work", function (req, res) {
  var item = req.body.newItem;
  if (item.trim() !== "") {
    workArray.push(item);
  }
  res.redirect("/work");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
