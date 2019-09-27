$(document.body).ready(function() {

  displaySavedArticles();

  $(document).on("click", ".unsave-article", unsaveArticle);
  $(document).on("click", ".article-notes", getArticleNotes);
  $(document).on("click", "#savenote", saveArticleNotes);
  $(".delete-success-close").on("click", function(event) {
    location.reload();
  });
});


function displaySavedArticles() {
  $.ajax({
    method: "GET",
    url: "/api/articles/saved"
  });
}


function getArticleNotes() {
  event.preventDefault();
  $("#note-content").empty(); // remove the content from last time
  var id = $(this)[0].attributes[1].value;
  $.ajax({
    method: "GET",
    url: "/api/articles/saved/" + id
  }).done(function(data) {
    $("#note-content").append("<h4>" + data.title + "</h4>");
    
    $("#note-content").append("<div class='form-group'><textarea class='form-control' rows='3' id='bodyinput' placeholder='Your note'></textarea></div>");
    // A button to submit a new note, with the id of the article saved to it
    $("#note-content").append("<button class='btn btn-secondary' data-id='" + data._id + "' id='savenote'>Save Note</button>");

    if (data.note) {
      $("#bodyinput").val(data.note.body);
    }
    $("#note-modal").modal("toggle");
  });
}

function saveArticleNotes() {
  var id = $(this).attr("data-id");
  $.ajax({
    method: "POST",
    url: "/api/articles/saved/" + id,
    data: {
      body: $("#bodyinput").val()
    }
  });
}

function unsaveArticle() {
  event.preventDefault();
  var id = $(this)[0].attributes[1].value;
  $.ajax({
    method: "PUT",
    url: "/api/articles/saved/" + id
  }).then(function(result) {
    $("#delete-success").modal("toggle");
  });
}

