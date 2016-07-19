var express = require("express");
var app = express();

var router = require("./routes/routes.js");

app.use(express.static('public'));
app.use("/", router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});