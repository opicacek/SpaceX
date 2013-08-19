function Rocket(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	
	this.gravity = 0.1; //TODO
	
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
	
	if (key_left) {
		this.rotation_speed -= 0.2;
	}
	if (key_right) {
		this.rotation_speed += 0.2;
	}
		
	this.rotation += this.rotation_speed;
	if (this.rotation < 0) {
		this.rotation = 360;
	} else if (this.rotation > 360) {
		this.rotation = 0;
	}
	
	
	
	if (key_up) {
		this.y -= 1;
	}
	
	this.y += this.gravity;
	
	if (this.y > 398) { //TODO crash?
		this.y = 398;
	}
}
