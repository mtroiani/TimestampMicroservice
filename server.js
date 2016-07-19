var express = require("express");
var app = express();

var router = require("./routes/routes.js");

app.use(express.static('public'));
app.use("/", router);

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port "+ process.env.PORT + "!"');
});