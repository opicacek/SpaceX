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

	//TODO get canvas size from server
	c.width = 850;
	c.height = 478;

	var screen_w = c.width;
	var screen_h = c.height;
	
	//
	var my_rocket = new Rocket(rocket_img, 600, 418);

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
	
	
	function drawWorld() {
		// background
		//ctx.drawImage(grass_img, x*map.tile_size, y*map.tile_size, map.tile_size, map.tile_size, x*map.tile_size, y*map.tile_size, map.tile_size, map.tile_size);
	}
	
	// draw loop
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
	
	function drawLoop(e) {

		requestAnimationFrame(drawLoop);
		
		now = Date.now();
		delta = now - then;
		
		if (delta > interval) {

			ctx.clearRect(0, 0, screen_w, screen_h);
			drawWorld();
			
			my_rocket.move(key_up, key_down, key_left, key_right);
			my_rocket.draw(ctx);
					
			// update time stuffs
			then = now - (delta % interval);		
		}
		
	}
	drawLoop();

}