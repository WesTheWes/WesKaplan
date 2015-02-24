(function(window, $){
	$(document).ready(function(){
		$( "form" ).submit(function(event) {
			event.preventDefault();

  			var formData = $( this ).serialize();
  			$.post("/message", formData)
  			.done(function(res) {
  				$('#testing').text(res);
  			});
		});
	});
})(window, $)