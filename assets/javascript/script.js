$(function() {
    var buttonArr = [];
    var imgArr = [];
    var respLimit = 10;

    $("select").on('change', function() {
        respLimit = this.value;
        console.log(respLimit);
    });



});