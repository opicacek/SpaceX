function Rocket(img, x, y) {
	this.img = img;
	this.w = this.img.width;
	this.h = this.img.height;
	
	this.x = x;
	this.y = y + this.h;
	this.map_ground_limit = y;
	
	this.gravity = 3; //TODO
	
	this.throttle = 0;
	this.acc = [0, 0];
	this.speed = [0, 0];
	
	this.rotation = 0;
	this.rotation_speed = 0;
}

Rocket.prototype.draw = function(ctx) {
	ctx.save();
	//ctx.translate(this.x - this.img.width/2 - 850, this.y - this.img.height/2); //TODO 850
	ctx.translate(this.x - this.img.width/2, this.y - this.img.height/2); //TODO 850
	ctx.rotate(this.rotation * Math.PI/180);

	ctx.drawImage(this.img, -this.img.width/2, -this.img.height/2);
	ctx.restore();
}

Rocket.prototype.move = function(key_up, key_down, key_left, key_right) {
	
	// Math.sign
	function sign(x) {
		return x > 0 ? 1 : x < 0 ? -1 : 0;
	}
	
	if (key_left) {
		this.rotation_speed -= 0.02;
	}
	if (key_right) {
		this.rotation_speed += 0.02;
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
		this.throttle = Math.min(this.throttle, 5);
	} else {
		this.throttle -= 0.02;
		this.throttle = Math.max(this.throttle, 0);
	}
	
	// TODO set throttle vector
	var vector_x = Math.sin(this.rotation * Math.PI/180) * this.throttle;
	var vector_y = Math.cos(this.rotation * Math.PI/180) * this.throttle;

	//console.log(vector_x, vector_y);
	
	this.speed[0] = vector_x;
	this.speed[1] = -vector_y;
	
	
	// summary throttle vector and gravity vector to speed vector
	this.x += this.speed[0];
	this.y += this.speed[1] + this.gravity;
	
	// TODO reduce speed - useless now
	//this.speed[0] -= 0.02 * sign(this.speed[0]);
	//this.speed[1] -= 0.02 * sign(this.speed[1]);
	this.rotation_speed -= 0.005 * sign(this.rotation_speed);

	
	//TODO check crash
	//TODO check rotation, speed...
	if (this.y > this.map_ground_limit + this.h) {
		//TODO rotate
		this.y = this.map_ground_limit + this.h;
	}
}
