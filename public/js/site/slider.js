(function(window,$){	
	$(document).ready(function() {

		var links = $('.work > a');
		var sliderScreen = $('.screen > ul, .list > ul');
		links.click(function(){
			var site = $(this);
			var offset = links.index(this) * 100/links.length;
			sliderScreen.css('transform', 'translate3d(-' + offset + '%, 0, 0)');
			return false;
		});

	});
})(window,$);