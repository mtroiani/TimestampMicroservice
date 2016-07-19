var express = require("express");
var router = express.Router();
  
router.route("/:query")
  .get(function (req, res) {
  var result = getResults(req.params.query);
  res.send(result);
});
  
  var getResults = function(query) {
    var unix = null, natural = null;
    if (query.match(/^-?\d+$/) !== null) {
      unix = parseInt(query, 10);
      natural = getNatural(unix);
    } else if (checkNatural(query)) {
      unix = getUnix(query);
      natural = getNatural(unix);
    }
    return { "unix": unix, "natural": natural };
  };
  

var checkNatural = function(check) {
  check = check.replace(/%20/gi, " ");
  var natDate = new Date(check);
  if (natDate.toString() !== "Invalid Date") {
    return true;
  }
};

var getNatural = function(unix) {
  unix = new Date(unix*1000);
  const months = ["January", "Febuary", "March", "April", "May", "June", "July", 
  "August", "September", "October", "November", "December"];
  var converted = months[unix.getMonth()] + " " + unix.getUTCDate() + ", " + unix.getUTCFullYear();
  return converted;
};

var getUnix = function(query) {
  const months = ["Jan", "Feb",  "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  query = query.replace(/%20/gi, " ");
  var natDate = new Date(query);
  var natStr = natDate.toString().split(" ");
  var mon = months.indexOf(natStr[1]);
  return Date.UTC(natStr[3], mon, natStr[2]) / 1000;
};

module.exports = router;