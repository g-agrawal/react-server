$(document).ready(function(){
    $(".navbar-toggler, .nav-link, .overlay").on("click", function(){
        $(".mobileMenu, .nav-link, .overlay").toggleClass("open");
    });
});