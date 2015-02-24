(function(document,$){

	$(document).ready(function(){
		// Variables

		// Developer
		var developer = $(".developer")[0];
		var typewriter = $(".typewriter");
		var developerWord = developer.innerHTML;
		developer.innerHTML = '';
		var maxTypeTime = 600;
		var minTypeTime = 100;

		// Designer
		var designer = $('.designer');

		var maskPath = $('#Mask path');

		var maskLength = maskPath[0].getTotalLength();

		var bgPath = $('#Background path');
		var bgLength = bgPath[0].getTotalLength();

		bgPath.css({
		  'stroke-dashoffset': bgLength,
		  'stroke-dasharray': bgLength + ' ' + bgLength
		})

		maskPath.css({
		  'stroke-dashoffset': 0,
		  'stroke-dasharray': maskLength + ' ' + maskLength
		})

		function rand(min, max){
			return min + Math.random()*(max - min);
		}

		// Draw svgPath

		function draw(svgPath, pathLength, time, timeout, cb, forward){
			// Set default direction to forward
			forward = typeof forward === "boolean" ? forward : true;

			// Set beginning and end of animation based on direction
			var beginning = forward ? -pathLength : pathLength;
			var end = 0;

			svgPath.css({
				'stroke-dashoffset': beginning
				});
			svgPath.animate({
				'stroke-dashoffset': end
		  	}, {
				duration: time,
			   	complete: function(){
			   		if(typeof cb === 'function') { 
			   			setTimeout(cb, timeout)
			   		}
			   	}
			})
		}

		// Erase svgPath 

		function erase(svgPath, pathLength, time, timeout, cb, foward){
			// Default direction is forward
			forward = (typeof forward === "boolean") ? forward : true;

			// Set where the animation will begin and end.
			var beginning = 0;
			var end = forward ? -pathLength : pathLength;

			svgPath.css({
				'stroke-dashoffset': beginning
			})
			svgPath.animate({
				'stroke-dashoffset': end
			}, {
				duration: time,
				complete: function(){
					if(typeof cb === 'function') { 
						setTimeout(cb, timeout) ;
					};
				}
			})
		}

		// Type word
		function type(el, word, cb){
			if (el.innerHTML.length < word.length) {
				setTimeout(function(){
					el.innerHTML += word[el.innerHTML.length];
					type(el,word,cb);
				}, rand(minTypeTime, maxTypeTime));
			}
			else{
				if(typeof cb === 'function') {
					setTimeout(cb, 1000);
				}
			}
		};

		// Erase word
		function backspace(el, cb){
			if (el.innerHTML.length > 0){
				setTimeout(
					function(){ 
						el.innerHTML = el.innerHTML.slice(0,-1);
						backspace(el, cb);
						},
					100
				);
			}
			else{
				if(typeof cb === 'function') {
					setTimeout(cb, 500);
				}
			}
		}

		function animate(){
			type( developer, developerWord, function() {
				backspace( developer, function() { 
					typewriter.toggleClass('hidden');
					designer.toggleClass('hidden');
					erase( maskPath, maskLength, 2000, 0, function() { 
						draw(bgPath, bgLength, 2000, 1000, function() {
							erase(bgPath, bgLength, 1000, 0, function() {
								draw( maskPath, maskLength, 1000, 500, function(){
									typewriter.toggleClass('hidden');
									designer.toggleClass('hidden');
									animate();
								});
							}, false);
						}, false);
					});
				});
			});
		}

		animate();

	});
})(document,$);