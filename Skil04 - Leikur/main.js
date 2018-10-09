// define variable for ball count paragraph


var para = document.querySelector('p');
var h3 = document.querySelector('h3');
var count = 0;
// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

    
/*
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

*/
var gravity = 0.2




/*function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}*/

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// define shape constructor

var keysDown = {};//bý til object sem geymir hvort það sé verið að ýta á takka

document.addEventListener("keydown", function (e) {//bý til eventlistener sem finnur hvaða takki er niðri
    keysDown[e.keyCode] = true;//og bæti takka keycodeinu í keysdown
  }, false);

document.addEventListener("keyup", function (e) {//ef það er sleppt takkanum
    delete keysDown[e.keyCode];//þá er takkanum eytt úr keysdown
  }, false);



function Shape(x, y, velX,velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = 5;
  this.velY = 0;
  this.exists = exists;
}

// define Ball constructor, inheriting from Shape


function Platform(x, y, velX, velY, exists, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.size = size;
    this.velX = -2;
}
Platform.prototype = Object.create(Shape.prototype)
Platform.prototype.constructor = Platform

Platform.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = "rgb(255,0,0)";
    ctx.rect(this.x,this.y,this.size*3.5,this.size)
    ctx.fill();
}



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

// define ball upDate method

Ball.prototype.upDate = function() {
    if((this.x + this.size) >= width) {
        this.velX = -(this.velX);
        this.exists = false;
    }

    if((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
        this.exists = false;
    }

    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
        this.exists = false;
    }
    if((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
        this.exists = false;
    }
    
    this.x += this.velX;
    this.y += this.velY;

};

Platform.prototype.Update = function() {
    
  if(this.x < -350) {
    this.exists = false;
  }
  this.x += this.velX;
};

/*Platform.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
      if(!(this === balls[j])) {
          var dx = this.x - balls[j].x;
          var dy = this.y - balls[j].y;
          
          var distance = Math.sqrt(dx * dx + dy * dy);
          
          
      if (distance < this.size + balls[j].size && balls[j].exists) {
        balls[j].color = this.color = 'rgb(255,255,255)';
          
        balls[j].exists = this.exists = false;
        //count -= 2;
        //para.textContent = 'Ball count: ' + count;
      }
    }
  }
};
*/


// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size && balls[j].exists) {
        //balls[j].color = this.color = 'rgb(255,255,255)';
        //balls[j].exists = this.exists = false;
        //count -= 2;
        //para.textContent = 'Ball count: ' + count;
          
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
    if (
        this.x + 4 > canvas.width ||
        this.x - 4 < 0 ||
        this.y + 4 > canvas.height
     ){

        this.y = canvas.height - 12;
        
    }
  
};

let mario = new EvilCircle(500,500, true);
mario.speed = 4;

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};


var balls = [];
var canJump = false;
EvilCircle.prototype.setControls = function() {
    if (canJump == true){
        if (32 in keysDown || 87 in keysDown){
            mario.y -= mario.speed;//ef ýtt er upp
            vy = -(canvas.height / 75);
            }
    }
    if (40 in keysDown || 83 in keysDown) {
      mario.y += mario.speed;//ef ýtt er niður
    }
    if (37 in keysDown || 65 in keysDown) {
      mario.x -= mario.speed;//eft ýtt er til vinstri
    }
    if (39 in keysDown || 68 in keysDown) {
      mario.x += mario.speed;//ef ýtt er til hægri
    }
};


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

// define loop that keeps drawing the scene constantly

//var evil = new EvilCircle(random(0,width), random(0,height), true);
var platArray = [];
function platforms(){
    var plat = new Platform(width,random(700,height),-1,0,true,100);
    platArray.push(plat);
}
function fjBolta(){
    var counter = 0;
    for(let i in balls){
        if (balls[i].exists == true){
            counter++;
            console.log("asd", counter)
        }
    }
    
    return counter;
}
vy = 0;
function loop() {
    let fjBolta1 = fjBolta();
    if(75 in keysDown && fjBolta1 < 1){ //til að skjota
        var ball = new Ball(mario.x+38, mario.y-5, 5,0,true,
                            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')', 15);
        balls.push(ball);
        count++;
        para.textContent = 'Ball count: ' + count;
    }
    
    ctx.fillStyle = "rgba(120,120,120,0.5)";
    ctx.fillRect(0,0,width,height);
    mario.setControls();
    
    
  for(var i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].upDate();
      balls[i].collisionDetect();
    }
  }
    
    if (mario.y === canvas.height-12){
        canJump = 1;
    }
    else{
        canJump = false;
    }
    for(var i = 0; i < platArray.length; i++) {
        if(platArray[i].exists) {
            platArray[i].Update();
            
            if (platArray.length > 3){ 
                platArray[i].draw();
                if ((mario.y >= platArray[i].y - 24 &&  //ef mario er ofaná platformi
                    mario.y <= platArray[i].y - 12&&
                    mario.x > platArray[i].x &&
                    mario.x < platArray[i].x + 300) ||
                    
                    //basically ef það er u tveir platforms á skjánum á sama tíma
                    (mario.y >= platArray[i-1].y - 24 && 
                    mario.y <= platArray[i-1].y - 12 &&
                    mario.x > platArray[i-1].x &&
                    mario.x < platArray[i-1].x + 300)
                   )
                {
                    canJump = 1;
                    vy = 0
                }
                else{
                    if (mario.y === canvas.height-12){
                        canJump = 1;
                    }
                    else{
                        canJump = false;
                    }
                }
            }
        }
         
      }
    
    mario.y += vy;
    vy += gravity;
    
    mario.checkBounds();
    mario.draw();
    mario.collisionDetect();
    //drawPaddle();
}
setInterval(platforms,2400)
setInterval(loop,5)