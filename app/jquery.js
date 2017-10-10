$(document).ready(function(){

    $(".js_click").click(function(){
        $('.pricing__plans-item').removeClass('active');

        $(this).addClass('active');

	});

    $(".header__btn-menu").click(function(){
        $(".header__menu").css("display", "block");
        $(".header__btn-menu").css("display", "none");
        $(".header__btn-menu-close").css("display", "inline-block");
    });

    $(".header__btn-menu-close").click(function(){
        $(".header__menu").css("display", "none");
        $(".header__btn-menu-close").css("display", "none");
        $(".header__btn-menu").css("display", "inline-block");
    });

});