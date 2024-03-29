window.$apimedia = {};
$.fancybox.defaults.backFocus = false;

function initInputMasks () {
	$('[data-api-input-mask="phone"]').inputmask({
		mask: '8 (999) 999-99-99',
		showMaskOnHover: false,
		onBeforePaste: function (pastedValue) {
			var processedValue = Inputmask.format(pastedValue, 'numeric');

			// do something with it

			if (processedValue.length > 10) {
				processedValue = processedValue.slice(processedValue.length - 10);
			}

			return processedValue;
		},
	});
	$('[data-api-input-mask="name"]').inputmask({
		regex: '[а-яА-Я -]*',
		showMaskOnHover: false,
	});
}

$(function() {
	initInputMasks();
});

window.$apimedia.InputMasks = {
	init: initInputMasks,
};


function initStuff () {
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
			top = $(id).offset().top -0;
		$('body,html').animate({scrollTop: top}, 500);
	});


	$(".js-callback").on( "click", function() {
	    var newinput = $(this).siblings(".speakers__slide_title").html();
		$(".js-speaker").val(newinput);
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

	$(document).on('click', '.js-scroll-content', function () {
		var target = document.querySelector('.move');

		if (target) {
			$('body,html').animate({
				scrollTop: target.offsetTop
			}, 500);
		}
	});
}

$(document).ready(function () {
	initStuff();
});



function initSliders () {
	var dateSlider = document.querySelector('.date__swiper-container');
	var tableSlider = document.querySelector('.table__swiper-container');

	if (dateSlider && tableSlider) {
		//Date Slider
		dateSlider = new Swiper ('.date__swiper-container', {
			slideClass: 'date__slide',
			wrapperClass: 'date__wrapper',
			slidesPerView: 1,
			threshold: 4,
			navigation: {
				nextEl: '.date__button-next',
				prevEl: '.date__button-prev',
			},
			// slideActiveClass: 'date__slide_active',
		});
		//Table Slider
		tableSlider = new Swiper ('.table__swiper-container', {
			slideClass: 'table__slide',
			wrapperClass: 'table__wrapper',
			slidesPerView: 1,
			autoHeight: true,
			threshold: 4,
			autoHeight: true,
			// navigation: {
			// 	nextEl: '.date__button-next',
			// 	prevEl: '.date__button-prev',
			// },

			// thumbs: {
			//     swiper: {
			//
			//         slideThumbActiveClass: '.date__slide_active',
			//     }
			// }
		});

		dateSlider.controller.control = [
			tableSlider,
		];
		tableSlider.controller.control = [
			dateSlider,
		];
	}

	//Speakers Slider
	if (document.querySelector('.speakers__swiper-container')) {
		var speakersSlider = new Swiper ('.speakers__swiper-container', {
			slideClass: 'speakers__slide',
			wrapperClass: 'speakers__wrapper',
			slidesPerView: 3,
			spaceBetween: 32,
			loop: true,
			navigation: {
				nextEl: '.speakers__button-next',
				prevEl: '.speakers__button-prev',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 32
				},
				640: {
					slidesPerView: 2,
					spaceBetween: 32
				},

				980: {
					slidesPerView: 3,
					spaceBetween: 32
				}
			}
		});
	}

	if (document.querySelector('.location__swiper-container')) {
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
	}

	//Recommend Slider
	var recommendSlider = new Swiper ('.recommend__container', {
		slideClass: 'recommend__item',
		wrapperClass: 'recommend__wrapper',
		slidesPerView: 3,
		loop: true,
		navigation: {
			nextEl: '.recommend__button-next',
			prevEl: '.recommend__button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 32
			},
			728: {
				slidesPerView: 2,
				spaceBetween: 38
			},
			1000: {
				slidesPerView: 3,
				spaceBetween: 38
			}

		}
	});
};


$(function () {
	initSliders();
});

var initYotubeThings = function() {

	var i, c, y, v, s, n;
	v = document.getElementsByClassName("youtube");

	for (n = 0; n < v.length; n++) {
		y = v[n]; // element

		var img_source = y.dataset.thumb;

		i = document.createElement("img");

		if (typeof img_source !== 'undefined') {
			i.setAttribute("src", img_source);
		}
		else {
			i.setAttribute("src", "https://img.youtube.com/vi/" + y.id + "/0.jpg");
		}


		i.setAttribute("class", "img-responsive img-width");

		y.appendChild(i);

		y.onclick = function () {
			var a = document.createElement("iframe");
			a.setAttribute("src", "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1&rel=0");
			a.setAttribute('allow', 'autoplay; fullscreen');
			a.style.width = this.style.width;
			a.style.height = this.style.height;
			this.parentNode.replaceChild(a, this)
		}
	}
	;

}

$(document).ready(function () {
	initYotubeThings();
});

// Здесь все, что потом необходимо запустить после подгрузки контента с сервера
function initAllComponents () {
	initStuff();
	initSliders();
};



window.$apiInitComponents = initAllComponents;