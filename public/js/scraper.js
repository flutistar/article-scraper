$(document.body).ready(function() {

  displayArticles();

  $("#start-scraper").on("click", startScrape);
  $(".scrape-success-close").on("click", function(event) {
    location.reload();
  });
  $(".save-success-close").on("click", function(event) {
    location.reload();
  });
  $(document).on("click", ".save-article", saveArticle);
  

});

function startScrape() {
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/api/scrape"
  }).then(function(data) {
    console.log(data);
    $("#scrape-success").append()
    $("#scrape-success").modal("toggle");
  });
}

function displayArticles() {
  $.ajax({
    method: "GET",
    url: "/api/articles",
  });
}

function saveArticle() {
  event.preventDefault();
  var id = $(this)[0].attributes[1].value;
  $.ajax({
    method: "PUT",
    url: "/api/articles/" + id
  }).then(function(result) {
    $("#save-success").modal("toggle");
  });
}

