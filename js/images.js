// intro
var space_img = new Image();
space_img.src = "img/space.png";

var spacex_logo_img = new Image();
spacex_logo_img.src = "img/spacex_logo.png";


// world
var tower_img = new Image();
tower_img.src = "img/tower.png";

var clouds_img = new Image();
clouds_img.src = "img/clouds.png";


// rocket
var rocket_img = new Image();
rocket_img.src = "img/rocket.png";

var smoke_img = new Image();
//smoke_img.src = "img/smoke.png";
smoke_img.src = "img/dust.png";

// flame
var flame_img_files = ["flame_1.png", "flame_2.png", "flame_3.png"];

var flame_img = [];
for (var i = 0; i < flame_img_files.length; i++) {
	var img = new Image();
	img.src = "img/flame/" + flame_img_files[i];
	flame_img.push( img );
}
