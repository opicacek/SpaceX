function Smoke(x, y, rocket_h, throttle, rotation) {
	this.img = smoke_img;
	this.w = this.img.width;
	this.h = this.img.height;
	
	this.x = x;
	this.y = y + this.h;
	
	var smoke_spread = rocket_h/50 + throttle/2;
	//var smoke_spread = throttle - rocket_h/10;
		
	//this.speed = Math.random()*throttle - throttle/2;
	this.speed = Math.random()*smoke_spread - smoke_spread/2;

	this.lifetime = 0;
	//this.lifetime = rocket_h;

	this.maxlife = 80;
	this.die = false;
}

Smoke.prototype.draw = function(ctx) {
	ctx.save();
	//ctx.scale(1, 1);
	
	//ctx.translate(this.x - this.img.width, this.y - this.img.height/2);
	ctx.translate(this.x, this.y + this.img.height/2);
	
	var scale = this.lifetime/this.maxlife;
	ctx.scale(scale, scale);
	ctx.globalAlpha = (this.maxlife - this.lifetime) / (this.maxlife/2);

	//ctx.drawImage(this.img, this.x - this.img.width, this.y - this.img.height/2);
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