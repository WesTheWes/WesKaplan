(function(window, $){
	document = window.document;
	$(document).ready(function(){
		var localLinks = $('a[href^=#]:not(#works a)');
		localLinks.click(function(e) {
			// e.preventDefault();
			var target = $(this).attr('href');
			scrollTop = target.length > 1 ? $(target).offset().top : 0;
			$('html, body').stop().animate({
				'scrollTop': scrollTop
				}, 2000, 'swing');
			return false;
		});
	});
})(window,$);