function Rocket(img, x, y) {
	this.img = img;
	this.w = this.img.width;
	this.h = this.img.height;
	
	this.x = x;
	this.y = y + this.h;
	this.map_ground_limit = y;
	
	this.gravity = 3; // gravity value
	
	this.throttle = 0;
	this.speed = [0, 0];
	
	this.rotation = 0;
	this.rotation_speed = 0;
}

Rocket.prototype.draw = function(ctx, animation_frame) {
	ctx.save();
	ctx.translate(this.x - this.img.width/2, this.y - this.img.height/2);
	ctx.rotate(this.rotation * Math.PI/180);

	ctx.drawImage(this.img, -this.img.width/2, -this.img.height/2);
	
	// flame
	if (this.throttle > 0) {
		var animation = Math.floor(animation_frame / (10 / flame_img.length) ) % flame_img.length;
		
		// flame scale
		ctx.save();
		var flame_scale = this.throttle / 5;
		ctx.scale(1, flame_scale);
		
		ctx.drawImage(flame_img[animation], -this.img.width/2, (flame_img[0].height - 13) / flame_scale);
		ctx.restore();
	}
	
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
		
	
	
	// change throttle
	if (key_up) {
		this.throttle += 0.02;
		this.throttle = Math.min(this.throttle, 5);
	} else {
		this.throttle -= 0.02;
		this.throttle = Math.max(this.throttle, 0);
	}
	
	// set throttle vector
	var vector_x = Math.sin(this.rotation * Math.PI/180) * this.throttle;
	var vector_y = Math.cos(this.rotation * Math.PI/180) * this.throttle;

	//console.log(vector_x, vector_y);
	
	this.speed[0] = vector_x;
	this.speed[1] = -vector_y;
	
	
	// summary throttle vector and gravity vector to speed vector
	this.x += this.speed[0];
	this.y += this.speed[1] + this.gravity;
	
	
	// hitting the ground
	var rotation = this.rotation;
	if (rotation > 180) {
		rotation -= 360;
	}
	
	var hit_limit = this.map_ground_limit + this.h;
	if (Math.abs(rotation) < 90) { // redefine limit
		hit_limit += Math.abs(rotation)/5;
	}
	
	if (this.y > hit_limit) {

		//TODO better detection
		if (this.speed[1] > -1) {
			console.log("Crash - too fast"); //TODO
		}	
		
		if (Math.abs(rotation) < 90) { // hit ground
			this.rotation_speed = 0;
			// rotate
			if (Math.abs(rotation) < 10) { // good landing
				this.rotation -= rotation / 20;
			} else {
				this.rotation += rotation / 50;
			}
			
			//this.y = this.map_ground_limit + this.h;
			this.y = hit_limit;
		} else { // crash
			//console.log("Crash - fall on side");
			this.throttle = 0;
			this.speed = [0, 0];
			this.rotation_speed = 0;
			
			//this.y = Math.min(this.y, this.map_ground_limit + this.h + 20);
			this.y = Math.min(this.y, hit_limit + 20);
			
			//TODO add explosion
			
		}
		
	}
	
	this.rotation += this.rotation_speed;
	if (this.rotation < 0) {
		this.rotation = 360;
	} else if (this.rotation > 360) {
		this.rotation = 0;
	}
	
	// TODO reduce speed - useless now
	//this.speed[0] -= 0.02 * sign(this.speed[0]);
	//this.speed[1] -= 0.02 * sign(this.speed[1]);
	this.rotation_speed -= 0.005 * sign(this.rotation_speed);
	
}
