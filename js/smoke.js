function Smoke(x, y, rocket_h, throttle, rotation) {
	this.img = smoke_img;
	this.w = this.img.width;
	this.h = this.img.height;
	
	this.x = x;
	this.y = y + this.h;
	
	this.lifetime = 0;
	this.maxlife = 80;
	this.die = false;
	
	this.throttle = throttle;
	
	var smoke_spread = rocket_h/50 + throttle/2;
		
	this.speed = Math.random()*smoke_spread - smoke_spread/2;

	
	if (rotation > 180) {
		rotation -= 360;
	}
	
	if (Math.abs(rotation) > 80) {
		this.die = true;
	} else {
		this.speed -= rotation / 27;
	}
	
}

Smoke.prototype.draw = function(ctx) {
	ctx.save();	

	ctx.translate(this.x, this.y + this.img.height/2);
	
	var scale = (this.lifetime/this.maxlife) * (this.throttle/2);
	ctx.scale(scale, scale);
	ctx.globalAlpha = (this.maxlife - this.lifetime) / (this.maxlife/2);

	ctx.drawImage(this.img, -this.img.width/2, -this.img.height);
	
	ctx.restore();
	
	ctx.globalAlpha = 1;
}

Smoke.prototype.move = function(ctx) {
	this.x += this.speed;
	
	this.lifetime += 1;
	if (this.lifetime >= this.maxlife) {
		this.die = true;
	}
}