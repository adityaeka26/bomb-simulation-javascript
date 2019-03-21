
var pesawat;
function setup() {
	createCanvas(1000, 500);
	frameRate(60);
	
	pesawat = new Pesawat();
	textSize(20);
}

function draw() {
	background(0);
	pesawat.draw();
	fill('#8B4513');
	rect(0, height-25, width, height);
}

var flag = true;
function keyPressed() {
	if (keyCode == ENTER) {
		pesawat.eject();
	} else if (keyCode == 32) {
		frameRate(flag ? 0 : 60);
		flag = !flag;
	}
}

function Pesawat() {
	var pos = [0, 0];
	var speed = 100 / 60;
	var bombs = [];
	var img = loadImage('assets/img/plane.png');
	this.draw = function() {
		image(img, pos[0], pos[1]);
		pos[0] += speed;
		
		if (pos[0] >= width) {
			pos[0] = 0;
			bombs = [];
		}
		
		for (var i = 0; i<bombs.length; i++) {
			if (bombs[i] != null) {
				bombs[i].draw();
			}
			if (bombs[i].getPos()[1] >= height) {
				bombs.splice(i, 1);
			}
		}
	}
	this.eject = function() {
		bombs.push(new Bomb(pos[0]+48, pos[1]+48, speed));
	}
}

function Bomb(x, y, v0) {
	v0 = v0 * 60;
	var pos = [x, y];
	var t = 0;
	var pi = 3.1415926535897;
	var sudut = 0;
	var theta = sudut / (2 * pi);
	var g = 300;
	var img = loadImage('assets/img/bomb.png');
	var explode = loadImage('assets/img/explode.png');
	var sound = loadSound('assets/sound/explode.mp3');
	this.getPos = function() {
		return pos;
	}

	this.draw = function() {
		if (pos[1] >= height-50) {
			image(explode, pos[0]-50, height-100);
			if (!sound.isPlaying()) {
				sound.play();
			}
		} else {
			image(img, pos[0]-25, pos[1]);
		}
		fill(255);
		var tt = t / 60;

		console.log(theta);
		pos[0] = x + v0 * cos(theta) * tt;
		pos[1] = y + -1 * (v0 * sin(theta) * tt - 0.5 * g * tt *tt);

		vx = v0 * cos(theta);
		vy = v0 * sin(theta) - g * tt;
		text('Vx: '+vx.toFixed(2)+'m/s', pos[0]+15, pos[1]+20);
		text('Vy: '+(-vy).toFixed(2)+'m/s', pos[0]+15, pos[1]+40);
		
		text('t: '+ tt.toFixed(2)+'s', pos[0]+15, pos[1]+60);
		t++;
	}
}