function play() {
	
	// Frame rate definition
	var fps = 50;
	var now;
	var then = Date.now();
	var interval = 1000 / fps;
	var delta;
	
	// Init
	var c = document.getElementById('c');
	var ctx = c.getContext('2d');

	// set canvas size
	c.width = 850;
	c.height = 478;

	var screen_w = c.width;
	var screen_h = c.height;
	
	var frame = -100; // 100 frames for intro
	var intro = true;
	$(c).css('background-image', 'url("img/bg.png")');
		
	//
	var map_ground_limit = 392;
	var my_rocket = new Rocket(rocket_img, 615, map_ground_limit);
	var smokes = [];
	
	// Controls
	var key_up = false;
	var key_down = false;
	var key_left = false;
	var key_right = false;

	if (!document.addEventListener && document.attachEvent)
	{
		// IE
		document.attachEvent('onkeydown', handleKeyDown)
		document.attachEvent('onkeypress', handleKeyPress)
		document.attachEvent('onkeyup', handleKeyUp)
	} else {
		window.addEventListener('keydown', handleKeyDown, true)
		window.addEventListener('keypress', handleKeyPress, true)
		window.addEventListener('keyup', handleKeyUp, true)
	}

	function handleKeyPress(event)
	{
		return stopPropagation(event.charCode, event);
	}

	function handleKeyDown(event)
	{
		if (event.keyCode == 38) // up
			key_up = true;
		else if (event.keyCode == 40) // down
			key_down = true;
		else if (event.keyCode == 37) // left
			key_left = true;
		else if (event.keyCode == 39) // right
			key_right = true;
	
		return stopPropagation(event.keyCode, event);
	}

	function handleKeyUp(event)
	{
		if (event.keyCode)
			key_any = false;
		if (event.keyCode == 38) // up
			key_up = false;
		else if (event.keyCode == 40) // down
			key_down = false;
		else if (event.keyCode == 37) // left
			key_left = false;
		else if (event.keyCode == 39) // right
			key_right = false;
	
		return stopPropagation(event.keyCode, event);
	}

	function stopPropagation(keyCode, event) {
		if (keyCode == 38 || keyCode == 40 || keyCode == 37 || keyCode == 39) {
			if (event.preventDefault) event.preventDefault();
			if (event.stopPropagation) event.stopPropagation();
			return false;
		}
	}

	// display controls
	$('#controls_up').bind('touchstart', function() {
		key_up = true;
	});
	$('#controls_up').bind('touchend', function() {
		key_up = false;
	});
	$('#controls_left').bind('touchstart', function() {
		key_left = true;
	});
	$('#controls_left').bind('touchend', function() {
		key_left = false;
	});
	$('#controls_right').bind('touchstart', function() {
		key_right = true;
	});
	$('#controls_right').bind('touchend', function() {
		key_right = false;
	});
	
	//
	function drawIntro() {
		
		var intro_frame = frame + 100;
		
		var space_scale = intro_frame / 2000;
		
		ctx.globalAlpha = (100 - intro_frame) / 40;
		
		ctx.save();
		ctx.scale(1 + space_scale, 1 + space_scale);
		//ctx.drawImage(space_img, 0, 0);
		ctx.drawImage(space_img, -intro_frame/6, -intro_frame/6);
		ctx.restore();
		
		ctx.drawImage(spacex_logo_img, 135, 150);
		
		if (frame == 0) {
			ctx.globalAlpha = 1;
			intro = false;
			$('.controls_button').css({opacity: 0});
			$('.controls_button').show();
			$('.controls_button').animate({opacity: 1}, 500);
		}
	}
	
	//
	function drawWorld() {
		
		ctx.drawImage(clouds_img, frame/4, 351);
		ctx.drawImage(clouds_img, frame/4 - screen_w, 351);

		ctx.drawImage(tower_img, 556, 351);
	}
	
	// draw loop
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	
	function drawLoop(e) {

		requestAnimationFrame(drawLoop);
		
		now = Date.now();
		delta = now - then;
		
		if (delta > interval) {
			
			frame += 1;
			if (frame == screen_w*4) {
				frame = 0;
			}
			ctx.clearRect(0, 0, screen_w, screen_h);

			if (intro) {
				ctx.globalAlpha = 1;
				drawWorld();
				my_rocket.draw(ctx);
				
				drawIntro();
				return;
			}
			
			drawWorld();
			
			my_rocket.move(key_up, key_down, key_left, key_right);
			my_rocket.draw(ctx, frame);
			
			
			// adding smoke
			var rocket_h = map_ground_limit - my_rocket.y + my_rocket.h;
			if (my_rocket.throttle > 0.05 && rocket_h < 50) {
				smokes.push( new Smoke(my_rocket.x - my_rocket.w/2, map_ground_limit, rocket_h, my_rocket.throttle, my_rocket.rotation) );
			}
			
			for (var i = 0; i < smokes.length;) {
				var s = smokes[i];
				
				s.move();
				s.draw(ctx);
				
				if (s.die) { // remove old smoke puff
					smokes.splice(i, 1);
				} else {
					i++;
				}	
			}
			
			// update HUD
			$("#engine").css({background: "rgba(255, 255, 255, " + (my_rocket.throttle / 5) + ")"});
					
			// update time stuffs
			then = now - (delta % interval);
		}
		
	}
	drawLoop();

}
