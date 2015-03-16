(function(window, $){
	$(document).ready(function(){
		$( "form" ).submit(function(event) {
			event.preventDefault();
			var _this = $(this)
  			var formData = _this.serialize();
  			$.post("/message", formData)
  			.done(function(res) {
  				formSuccess(_this, res);
  			});
		});

		var inputs = $('.input');
		inputs.blur(function(){
			console.log(!$(this).val());
			if ( $(this).val() ) {
				$(this).parent().addClass("filled");
			} else {
				$(this).parent().removeClass("filled");
			}
		});
	});
})(window, $)

function formSuccess(form, res){
	console.log(res);
	form.addClass('success');
	setTimeout(function(){
			form.css('position','absolute');
			form.before(res);
			setTimeout(function(){
				$('.confirmation').addClass('submitted');
			}, 500);
	}, 500);
}
