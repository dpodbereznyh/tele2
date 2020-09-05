$(document).ready(function () {

    // $(window).scroll(function() {
    //     if ($(this).scrollTop() > 90){
    //         $('header').addClass("sticky");
    //     }
    //     else{
    //         $('header').removeClass("sticky");
    //     }
    // });

    $(function() {
        $('#main-menu').smartmenus({
            mainMenuSubOffsetX: -1,
            mainMenuSubOffsetY: 4,
            subMenusSubOffsetX: 6,
            subMenusSubOffsetY: -6
        });
    });

// SmartMenus mobile menu toggle button
    $(function() {
        var $mainMenuState = $('#main-menu-state');
        if ($mainMenuState.length) {
            // animate mobile menu
            $mainMenuState.change(function(e) {
                var $menu = $('#main-menu');
                if (this.checked) {
                    $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
                } else {
                    $menu.show().slideUp(250, function() { $menu.css('display', ''); });
                }
            });
            // hide mobile menu beforeunload
            $(window).bind('beforeunload unload', function() {
                if ($mainMenuState[0].checked) {
                    $mainMenuState[0].click();
                }
            });
        }
    });

    // для плавного перехода по якорям
    $(".yakor").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top -80;
        $('body,html').animate({scrollTop: top}, 500);
    });


    $(".js-callback").on( "click", function() {
        var newtitle = $(this).attr("data-title");
        var newinput = $(this).attr("data-input");
        $(".js-title").html(newtitle);
        $(".js-zakaz").val(newinput);
    });


    $("#popup-form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            // $(this).find("input").val("");
            parent.jQuery.fancybox.getInstance().close();
            $.fancybox.open({
                src: '#fancyalert',
            });
            $("#popup-form").trigger("reset");
        });
        return false;
    });
    $(".footer__form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open({
                src: '#fancyalert',
            });
            $(".footer__form").trigger("reset");
        });
        return false;
    });

    //Timetable
    $('.card-table').stacktable({
        headIndex: '0',
    });

    // FAQ
    $('.faq__item_head').click(function () {
        $(this).next().slideToggle(500);
            $(this).parent('.faq__item').toggleClass('faq__item-active');
            $(this).find('.faq__item_description').toggleClass('faq__item_description-active');
            $(this).find('.icon-faq-arrow').toggleClass('icon-faq-arrow-active');

    });
});
//Location Slider
var locationSlider = new Swiper ('.location__swiper-container', {
    slideClass: 'location__swiper-slide',
    wrapperClass: 'location__swiper-wrapper',
    navigation: {
        nextEl: '.location__button-next',
        prevEl: '.location__button-prev',
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 32
        },
        577: {
            slidesPerView: 3,
            spaceBetween: 32
        }
    }

});

//Date Slider
var dateSlider = new Swiper ('.date__swiper-container', {
    slideClass: 'date__slide',
    wrapperClass: 'date__wrapper',
    slidesPerView: 1,
    navigation: {
        nextEl: '.date__button-next',
        prevEl: '.date__button-prev',
    },
    // slideActiveClass: 'date__slide_active',
});
//Table Slider
var tableSlider = new Swiper ('.table__swiper-container', {
    slideClass: 'table__slide',
    wrapperClass: 'table__wrapper',
    slidesPerView: 1,
    // thumbs: {
    //     swiper: {
    //
    //         slideThumbActiveClass: '.date__slide_active',
    //     }
    // }
});
//Speakers Slider
var speakersSlider = new Swiper ('.speakers__swiper-container', {
    slideClass: 'speakers__slide',
    wrapperClass: 'speakers__wrapper',
    slidesPerView: 3,
    spaceBetween: 32,
    navigation: {
        nextEl: '.speakers__button-next',
        prevEl: '.speakers__button-prev',
    }
});
