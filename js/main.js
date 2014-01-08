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
				
				console.log($activeTitle);
				
				var $activeElement = $('.js-main-nav li').find('a#'+$activeTitle+'-nav');
				var $prevActive = $('.js-main-nav li').find('a.active');
				
				console.log($activeElement, direction);
				
				
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

		}		
	}
     
})(jQuery);
