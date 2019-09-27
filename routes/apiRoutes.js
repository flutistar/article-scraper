var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");
var router = express.Router();

router.get("/api/scrape", function(req, res) {
  // request for nyt articles
  request("https://medium.com/topic/technology", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // console.log(html);
    $("div.ld.w.ap.hz.le").each(function(i, element) {
      var result = {};
      result.link = $(this).children("div").children("a").attr("href");
      result.title = $(this).children("div").children("a").children('div').children('h4').text().trim();
      result.summary = $(this).children("div").children("span").text().trim();
      result.saved = false;
      if (result.title && result.link) {
        db.Article
        .find({link: result.link})
        .then(function(document) {
            if(document.length==0){
              db.Article.create(result)              
              res.json({"messege":"There any new article."});
            }
            else{
              res.json({"messege":"There isn't any new article."});
            }
        })
          .catch(function(err) {
            // res.json(err);
            console.log(err);
          });
        }
    });
    // res.json([{"messege":"Scrape Complete"}]);
  });
  
});


router.get("/api/articles", function(req, res) {
  db.Article
    .find( { "saved": false } )
    .then(function(dbArticle) {
      console.log(dbArticle);
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


router.put("/api/articles/:id", function(req, res) {
  db.Article
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: true } } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
  });
});


router.get("/api/articles/saved", function(req, res) {
  db.Article
    .find( { "saved": true } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


router.put("/api/articles/saved/:id", function(req, res) {
  db.Article
    .findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: false } } )
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
  });
});


router.get("/api/articles/saved/:id", function(req, res) {
  db.Article
    .findOne({ _id: req.params.id })
    // get the notes for this article
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


router.post("/api/articles/saved/:id", function(req, res) {
  db.Note
    .create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


module.exports = router;