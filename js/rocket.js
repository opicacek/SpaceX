function Rocket(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	
	this.gravity = 0.2; //TODO
	
	this.throttle = 0;
	this.acc = [0, 0];
	this.speed = [0, 0];
	
	this.rotation = 0;
	this.rotation_speed = 0;
}

Rocket.prototype.draw = function(ctx) {
	ctx.save();
	//ctx.translate(this.x - this.img.width/2 - 850, this.y - this.img.height/2); //TODO 850
	ctx.translate(this.x - this.img.width/2, this.y); //TODO 850
	ctx.rotate(this.rotation * Math.PI/180);

	ctx.drawImage(this.img, -this.img.width/2, 0);
	ctx.restore();
}

Rocket.prototype.move = function(key_up, key_down, key_left, key_right) {
	
	// Math.sign
	function sign(x) {
		return x > 0 ? 1 : x < 0 ? -1 : 0;
	}
	
	if (key_left) {
		this.rotation_speed -= 0.05;
	}
	if (key_right) {
		this.rotation_speed += 0.05;
	}
		
	this.rotation += this.rotation_speed;
	if (this.rotation < 0) {
		this.rotation = 360;
	} else if (this.rotation > 360) {
		this.rotation = 0;
	}
	
	// change throttle
	if (key_up) {
		this.throttle += 0.02;
		this.throttle = Math.min(this.throttle, 1);
	} else {
		this.throttle -= 0.02;
		this.throttle = Math.max(this.throttle, 0);
	}
	
	// TODO set throttle vector
	//this.speed[0] = this.speed[0] + this.throttle;
	//this.speed[1] = this.speed[1] + this.throttle + this.gravity;
	
	
	
	// summary throttle vector and gravity vector to speed vector
	this.x += this.speed[0];
	this.y += this.speed[1];
	
	// TODO reduce speed
	this.speed[0] -= 0.2 * sign(this.speed[0]);
	this.speed[1] -= 0.2 * sign(this.speed[1]);
	
	if (this.y > 392) { //TODO crash?
		//TODO rotate
		this.y = 392;
	}
}
