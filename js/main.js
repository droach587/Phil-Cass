/* ------------------------------------------------------------------------
Ammirati Global Function Setlist
------------------------------------------------------------------------- */
var mainJs = (function($){

	// Avoid `console` errors in browsers that lack a console.
	(function() {
	    var method;
	    var noop = function () {};
	    var methods = [
	        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
	        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
	        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
	        'timeStamp', 'trace', 'warn'
	    ];
	    var length = methods.length;
	    var console = (window.console = window.console || {});
	
	    while (length--) {
	        method = methods[length];
	
	        // Only stub undefined methods.
	        if (!console[method]) {
	            console[method] = noop;
	        }
	    }

	}());
	
	//Set Year
	$('.js-theyear').html((new Date).getFullYear());
	
	//ClearForm Public
	var clearForm = function(){
		//Clear form inputs
		$('.clearForm').each(function(){
			$(this).attr('title',$(this).attr('value'));
		})
		//On Focus
		$('.clearForm').focus(function(){									
			if($(this).attr('value')==$(this).attr('title')){
				$(this).attr('value','');
			 }else{
			 	$(this).select();
			 }								
		})
		// On Blur
		$('.clearForm').blur(function(){ 				
			if($(this).attr('value')==''){
			 	$(this).attr('value',$(this).attr('title'));
			 }
		})
	}//clearform
	
	clearForm();
	
	//Js Sparkle
	$('.js-sparkle-col').jstars({
		 image_path: 'img',
		 style: 'rand',       // optional, magic style, default = white
		 frequency: 30
	});
	
	//Flex Carousel
	$('#carousel').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    itemWidth: 114,
	    itemMargin: 8,
	    asNavFor: '.photo-gal-slider',
	});
	
	//Photo Gal Slider
	$('.photo-gal-slider').flexslider({
	    animation: "slide",
	    controlNav: false,
	    animationLoop: false,
	    slideshow: false,
	    sync: "#carousel",
	    before: function(slider){
	    	$activeSlide = $('.photo-gal-slider').find('.flex-active-slide');
			isVideo = $activeSlide.hasClass('video');
			if(isVideo){
				var html = $activeSlide.html();
				$activeSlide.html('').css('background','black').html(html);
			}
	    }
	});
	
	//Force Mobile Nav Up Top
	$(window).scroll(function(){
		$('.js-mobile-nav').css('top',0);
	});
	
	//Window Load
	$(window).load(function(){
		$philHome = $('.js-phil-anim');
		$philippaHome = $('.js-philippa-anim');
		$duckHome = $('.js-duck-anim');
		
		$philHome.css('opacity',0).removeClass('hidden').css('opacity',1);
		$philHome.find('img').css('top',600);
		setTimeout(function(){
			$philHome.find('img').css('top',0);
		},200);
		
		setTimeout(function(){
			$philippaHome.css('opacity',0).removeClass('hidden').css('opacity',1);
			$philippaHome.find('img').css('top',600);
				setTimeout(function(){
					$philippaHome.find('img').css('top',0);
					setTimeout(function(){
						$duckHome.css('opacity',0).removeClass('hidden').css('opacity',1);
						$duckHome.find('img').css('top',600);
						setTimeout(function(){
							$duckHome.find('img').css('top',0);
						},100);
					},100);
				},100)
		},200);
		
		parallaxElem = function() {
			//Store this in cache
		    var distScrolled;
	    	$(window).scroll(function() {
	    		//Calculate distance scrolled, convert to a ratio, animate by it
	    		distScrolled = $(document).scrollTop();
	    		$duckHome.find('img').css('top', distScrolled * +.10);
	    		$philHome.find('img').css('top', distScrolled * +.25);
	    		$philippaHome.find('img').css('top', distScrolled * +.30);
	    		//$('#badge-sparkle-hero').css('margin-top', distScrolled * .2);
	    		//Reset at the top
	    		if (distScrolled == 0) {
	    			$duckHome.find('img').stop().animate({
	    				'margin-top': 0
	    			}, 200, 'swing');
	    			
	    			$philHome.find('img').stop().animate({
	    				'margin-top': 0
	    			}, 200, 'swing');
	    			
	    			$philippaHome.find('img').stop().animate({
	    				'margin-top': 0
	    			}, 200, 'swing');
	    		}
		    });
		};
		    	
		isTouch = $('html').hasClass('touch');
		if (!isTouch) {
	    	parallaxElem();
	    }
		
	});
	
	// PUBLIC METHODS
	return {
			
		scrollingWaypoint: function(options) {
			
			var defaults = {
				standardOffset: 55
			}
			options = $.extend(defaults, options);
			
			//Set Waypoints
			standardOffset = options.standardOffset;
			
			$('#awards').waypoint({ offset: standardOffset });
			$('#test').waypoint({ offset: standardOffset });
			$('#gallery').waypoint({ offset: standardOffset });
			$('#promo-showcase').waypoint({ offset: standardOffset });
			$('#contact').waypoint({ offset: standardOffset+150 });
			
			$(window).scroll( function(){
				scrollTop = $(document).scrollTop();
				if(scrollTop == 0){
					$('.js-main-nav li').find('a.active').removeClass('active');
				}
			});

			//set elements as waypoints
			$('body').delegate('#awards, #test, #gallery, #promo-showcase, #contact', 'waypoint.reached', function(event, direction) {

				
				var $activeTitle = $(this).attr('id');
				
				console.log(event.currentTarget);
				
				var $activeElement = $('.js-main-nav li').find('a#'+$activeTitle+'-nav');
				var $prevActive = $('.js-main-nav li').find('a.active');
				
				
				if (direction === "up") {
					//console.log($active,$prevActive);
					$('.primary-nav-links li').each(function(){
						$(this).find('a').removeClass('active');
					})
					$prevActive.parent().prev().find('a').addClass('active');
				}else{
					$('.primary-nav-links li').each(function(){
						$(this).find('a').removeClass('active');
					})
					$('.js-main-nav li').find('a#'+$activeTitle+'-nav').addClass('active');
				}		
			});

		},
		logoPopup: function(options){
			var defaults = {}
			
			options = $.extend(defaults, options);
			
			$(window).scroll(function(){
				distScrolled = $(document).scrollTop();
				$logoPopup = $('.js-logo-popup');
				isHidden = $logoPopup.hasClass('hidden');
				isTouch = $('html').hasClass('touch');
				scrollThreshold = 200;
				
				if(isTouch){
					scrollThreshold = 55;
				}
				
				if(distScrolled>scrollThreshold && isHidden){
					$logoPopup.css('opacity',0).removeClass('hidden').stop().animate({
						'opacity':1
					},200);
				}else if(scrollThreshold>distScrolled && !isHidden){
					$logoPopup.stop().animate({
						'opacity':0
					},100,function(){
						$(this).addClass('hidden');
					})
				}else{
					return false;
				}
			});//Window scroll
			
			//Popup Func
			$('.js-logo-popup').mousedown(function(){
				$('html, body').animate({
					scrollTop: 0
				}, 1000);
			});
		},
		scrollSpy: function(options){
			var defaults = {}
			options = $.extend(defaults,options);
			
			var scrollToFunc = function(){
				function scroller(target){
					navi = parseInt($('.js-primary-nav').outerHeight());
					$('html, body').animate({
					    scrollTop: ($(target).offset().top - 55)
					 }, 1000);
				}
				$trigger = $('.js-main-nav li a, .js-mobile-tree li a');
				
				$trigger.click(function(e){
					target = $(this).attr('href');
					scroller(target);
					e.preventDefault();
				});
				
				$('.js-secondary-jump').click(function(e){
					target = $(this).attr('href');
					scroller(target);
					e.preventDefault();
				});
			}
			//Execute
			scrollToFunc();

		},
		mobileNavi: function(options){
			var defaults = {};
			options = $.extend(defaults, options);
			
			$(document).ready(function(){
				$('.js-mobile-nav').mousedown(function(){
					$tree = $('.js-mobile-tree')
					isHidden = $tree.hasClass('hidden');
					if(isHidden){
						$tree.css('opacity',0).removeClass('hidden').stop().animate({
							'opacity':1
						},500);
					}else{
						$tree.stop().animate({
							'opacity':0
						},function(){
							$(this).addClass('hidden');
						})
					}
				});
			});
		}		
	}
     
})(jQuery);
