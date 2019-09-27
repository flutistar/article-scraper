var express = require("express");
var db = require("../models");
var router = express.Router();

router.get("/", function(req, res) {
  db.Article
    .find( { "saved": false } )
    .then(function(dbArticle) {
      console.log('router.get');
      res.render("scraped", { articles: dbArticle });
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/saved", function(req, res) {
  db.Article
    .find( { "saved": true } )
    .then(function(dbArticle) {
      console.log('router.get/saved');
      res.render("saved", { articles: dbArticle });
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;