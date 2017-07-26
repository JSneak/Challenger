document.addEventListener("DOMContentLoaded", function(){
  $('.preloader-background').delay(1700).fadeOut('slow');
  
  $('.preloader-wrapper')
    .delay(1700)
    .fadeOut();

  $("nav").attr("class","")
  $(".container").removeClass("hidden")
});