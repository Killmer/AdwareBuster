$(document).ready(function(){

    $(".js_click").click(function(){
        $('.pricing__plans-item').removeClass('active');

        $(this).addClass('active');

	});
});