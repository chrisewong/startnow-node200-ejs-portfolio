$(document).ready(function() {
    addClick();
});

function addClick(){
    $("nav a").click(function(e) {
        var sectionID = e.currentTarget.id + "Section";
        e.preventDefault();
        alert("button id" + e.currentTarget.id);

        $("html body").animate({
                scrollTop: $("#" + sectionID).offset().top

        }, 1000)
    })
}