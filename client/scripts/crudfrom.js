$(function () {
    getProgram();
});

function getProgram() {
    $.ajax({
        url: local
    })
}