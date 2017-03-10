$(document).ready(function() {
    var buttonArr = ["dog", "funny cat", "family guy", "game of thrones", "trump", "horrible bosses", "simpsons"];
    var respLimit = 10;

    $("select").on('change', function() {
        respLimit = this.value;
        console.log(respLimit);
    });

    function addButton(val, all = false) {
        if (all) {
            for (var i = 0; i < buttonArr.length; i++) {
                $("#buttonContainer").append($("<button>").attr({ "class": "btn btn-default custom-btn", "data-name": buttonArr[i] }).text(buttonArr[i]));
            }
        }
        if (val !== "") {
            buttonArr.push(val);
            $("#buttonContainer").append($("<button>").attr({ "class": "btn btn-default custom-btn", "data-name": val }).text(val));
        }
    }

    function addGif(rating, url, height) {
        var divEle = $("<div>").attr({ "class": "col-lg-3 col-md-4 col-sm-4 col-xs-12 gif-container" });
        var thumbNail = $("<div>").attr({ "class": "thumbnail" });
        var imgEle = $("<img>").attr({ "src": url }).css("height", height);
        var caption = $("<div>").attr({ "class": "caption" });
        var rating = $("<h5>").text("Rating: " + rating);
        caption.html(rating);
        thumbNail.append(imgEle).append(caption);
        divEle.html(thumbNail);
        $("#resultsContainer").append(divEle);
    }

    function startStopAnimation() {
        var url = "" + $(this).attr("src");
        if (url.match(/_s.gif$/)) {
            url = url.replace("_s.gif", ".gif");
        } else {
            url = url.replace(".gif", "_s.gif");
        }
        $(this).attr("src", url);
    }

    function makeAPICall() {
        var q = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            q + "&api_key=dc6zaTOxFJmzC&limit=" + respLimit;
        $("#resultsContainer").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                addGif(data[i].rating, data[i].images.fixed_height.url, data[i].images.fixed_height.height);
            }
        });
    }

    $("#submitBtn").on("click", function() {
        addButton($("#searchInput").val());
        $("#searchInput").val("");
    });

    addButton("", true);
    $(document).on("click", ".custom-btn", makeAPICall);
    $(document).on("click", "img", startStopAnimation);
});