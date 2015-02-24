+(function(window,$) {
	$(document).ready(function() {
		function parallaxInit(){
			scrolling = true;
			container = $('#thatsMe');
			element = $('.thatsMe');
			elHeight =  element.innerHeight();
			conHeight = container.innerHeight();
			viewHeight = $(window).innerHeight();
			conTop = container.offset().top;
			parallaxRate = (elHeight-conHeight)/(viewHeight+conHeight);
			parallaxOffset = viewHeight-conTop;
		}

		// when scrollTop = elOffset - viewport, position should be 0
		// when scrollTop = viewport + elOffset + elHeight, position should be elHeight
	
		function parallax() {
			requestAnimationFrame(parallax);
			if(scrolling){
				var top = $(window).scrollTop();
				var position =  parallaxRate*(top + parallaxOffset);
				element.css('transform' , 'translate3d(0, ' + position + 'px, 0)');
				scrolling = false;
			}
		}

		var scrolling;
		var container;
		var element;
		var elHeight;
		var conHeight;
		var viewHeight;
		var conTop;
		var parallaxRate;
		var parallaxOffset;

		parallaxInit();
		requestAnimationFrame(parallax);

		$(window).on('scroll', function(){ scrolling = true; });
		$(window).on('resize', function(){ parallaxInit(); })
	});
})(window,$);