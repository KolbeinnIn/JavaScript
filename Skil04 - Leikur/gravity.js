
function loop() {
	var keysDown = {};//bý til object sem geymir hvort það sé verið að ýta á takka

document.addEventListener("keydown", function (e) {//bý til eventlistener sem finnur hvaða takki er niðri
    keysDown[e.keyCode] = true;//og bæti takka keycodeinu í keysdown
  }, false);

document.addEventListener("keyup", function (e) {//ef það er sleppt takkanum
    delete keysDown[e.keyCode];//þá er takkanum eytt úr keysdown
  }, false);
	window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(f){window.setTimeout(f,1e3/60)}}();

	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	var W = canvas.width = window.innerWidth;
	var H = canvas.height = window.innerHeight;
	
	// Velocity x
	var vx = 0;
    var vy = -20;
	// Velocity y
	//var vy = (Math.random() * -15) - 5;
	//var vy = -20;
    if (32 in keysDown){
        var vy = -15;
    }
	var gravity = 0.5;
	// Bounce Factor is the force with which
	// the ball should rebound. 1 means 100%
	// 0.1 means 10%, so on ...
	var bounce_factor = 0;
	
	function Ball() {
		this.radius = 50;
		this.x = canvas.width / 2;
		this.y = canvas.height - this.radius;
		
		this.draw = function(ctx) {
			ctx.fillStyle = 'black';
			ctx.beginPath();
			
			ctx.arc(
				this.x,
				this.y,
				this.radius,
				0,
				Math.PI*2,
				false
			);
			
			ctx.closePath();
			ctx.fill();
		}
	}
	
	var ball = new Ball();
	
	(function renderFrame() {
		requestAnimationFrame(renderFrame);
		ctx.clearRect(0, 0, W, H);
		
		vy += gravity;
		
		ball.x += vx;
		ball.y += vy;
		
		// ball.y + ball.radius > canvas.height
		// The above check most probably causes
		// vy to decrease over time. Thats why a
		// bounce factor of 1 doesnt really make ball
		// bounce upto where it started forever.
		//
		// As usual, we can CHEAT :D
		// Save the vy in a tmp variable when this if
		// condition is hit for the first time.
		// From next time, assign that tmp var
		// to vy, done!
		
		if (
				ball.x + ball.radius > canvas.width ||
				ball.x - ball.radius < 0 ||
				ball.y + ball.radius > canvas.height// ||
				//ball.y - ball.radius  < 0
			 ) {
			
			// Re-positioning on the base ;)
			ball.x = canvas.width / 2;
			ball.y = canvas.height - ball.radius;
			
			// If we do not re-set the velocities
			// then the ball will stick to bottom :D
			
			// Velocity x
			vx = 0;
			// Velocity y
			// vy = (Math.random() * -15) - 5;
			vy *= -bounce_factor;
		}
		
		ball.draw(ctx);
	}());

}
setInterval(loop,2000)