// define variable for ball count paragraph



var para = document.querySelector('p');
var h3 = document.querySelector('h3');
var count = 0;
// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth-200;
var height = canvas.height = window.innerHeight-200;


var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = (canvas.height-paddleHeight)/2;
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
    if(relativeY > 0 && relativeY < canvas.height) {
        paddleY = relativeY - paddleHeight/2;
    }
    h3.textContent = relativeX + " " + relativeY;
        
}


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// define Ball constructor, inheriting from Shape

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);

  this.color = color;
  this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size && balls[j].exists) {
        //balls[j].color = this.color = 'rgb(255,255,255)';
        balls[j].exists = this.exists = false;
        count -= 2;
        para.textContent = 'Ball count: ' + count;
      }
    }
  }
};




// define EvilCircle constructor, inheriting from Shape
//playerinn
function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, 20, 20, exists);

  this.color = 'blue';
  this.size = 10;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;


// define EvilCircle draw method

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


// define EvilCircle checkBounds method

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size;
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y += this.size;
  }
};

// define EvilCircle setControls method
var balls = [];
EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
    if(e.keyCode === 65){ // || e.keyCode === 37) { // a
        _this.x -= _this.velX;
    }
    else if(e.keyCode === 68){ // || e.keyCode === 39) { // d
        _this.x += _this.velX;
    }
    else if(e.keyCode === 87){ // || e.keyCode === 38) { // w
        _this.y -= _this.velY;
    }
    else if(e.keyCode === 83){ // || e.keyCode === 40) { // s
        _this.y += _this.velY;
    }
    else if(e.keyCode === 32){
        var ball = new Ball(paddleX+38, paddleY-5, 0, -2, true,
                            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')', 15);
        balls.push(ball);
        count++;
        para.textContent = 'Ball count: ' + count;
    }
  };
};

// define EvilCircle collision detection

EvilCircle.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if( balls[j].exists ) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      /*if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = 'Ball count: ' + count;
      }*/
    }
  }
};



// define array to store balls



// define loop that keeps drawing the scene constantly

var evil = new EvilCircle(random(0,width), random(0,height), true);
evil.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  while(balls.length < 2) {
    var size = random(10,20); //size neðst í lykkju
    var ball = new Ball(    
      // ball position always drawn at least one ball width
      // away from the adge of the canvas, to avoid drawing errors
      random(0 + size,width - size), // x
      random(0 + size,height - size), // y
      random(2,2), // velX 
      random(-2,-2), // velY
      true,         // exists
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')', //color
      size //size (efst í lykkju)
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
  }

  for(var i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }
    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();
    drawPaddle();
    //requestAnimationFrame(loop);
}



//loop();

setInterval(loop,2)