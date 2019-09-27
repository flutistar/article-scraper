var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var logger = require("morgan");
var apiRoutes = require("./routes/apiRoutes");
var htmlRoutes = require("./routes/htmlRoutes");

var app = express();

app.use(logger("dev")); // log requests
app.use(bodyParser.urlencoded({ extended: false })); // for form submissions
app.use(express.static("public"));
app.use("/", apiRoutes);
app.use("/", htmlRoutes);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// mongo configuration
// var databaseUrl = "article_scraper";
var collections = ["articles"];

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/articleScraper";
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});


app.listen(process.env.PORT || 8080, function() {
  console.log("App running on port 8080!");
});
