$(function() {
    var buttonArr = ["rabbit", "pengiun", "dog", "cat"];
    var imgArr = [];
    var respLimit = 10;

    function addButton(val, all = false) {
        if (all) {
            for (var i = 0; i < buttonArr.length; i++) {
                var buttonEle = $("<button>").attr({ "class": "btn btn-default custom-btn" }).text(buttonArr[i]);
                $("#buttonContainer").append(buttonEle);
            }
        }
        if (val !== "") {
            buttonArr.push(val);
            var buttonEle = $("<button>").attr({ "class": "btn btn-default custom-btn" }).text(val);
            $("#buttonContainer").append(buttonEle);
        }
        $("#submitBtn").on("click", function() {
            addButton($("#searchInput").val());
            $("#searchInput").val("");
        });

    }

    $("select").on('change', function() {
        respLimit = this.value;
        console.log(respLimit);
    });


    addButton("", true);
});