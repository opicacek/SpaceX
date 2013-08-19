function Rocket(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	
	this.gravity = 0.5; //TODO
	
	this.acc = [0, 0];
	this.speed = [0, 0];
}

Rocket.prototype.draw = function(ctx) {
	ctx.drawImage(this.img, this.x, this.y);
}

Rocket.prototype.move = function(key_up, key_down, key_left, key_right) {
	
	if (key_up) {
		this.y -= 1;
	}
	
	this.y += this.gravity;
	
	if (this.y > 417) { //TODO crash?
		this.y = 417;
	}
}
