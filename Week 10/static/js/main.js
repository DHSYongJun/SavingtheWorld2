$(document).ready(function(){
    $('ul.tabs').tabs({
		swipeable: true,
		responsiveThreshold: 1920,
		duration: 250
    });
    $('.collapsible').collapsible();
    $(".dropdown-trigger").dropdown();
});
