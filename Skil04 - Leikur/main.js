//------------------------------------------------------
//uppsetning á stigum, stigin og titillinn birt á skjánum.
var titill = document.getElementById('titill');
var stigstatus = document.getElementById('stig');
var lifstatus = document.getElementById('lif');
var controls = document.getElementById('controls');
var controls2 = document.getElementById('controls2');
var controls3 = document.getElementById('controls3');
var lif = 3;
var stig = 0;

titill.textContent = "Skot-platformer";
lifstatus.textContent = "Líf: " + lif;
stigstatus.textContent = "Stig: " + stig;
controls.textContent = "w eða spacebar til að hoppa.";
controls2.textContent = "a og d fyrir hægri og vinstri.";
controls3.textContent = "k til að skjóta vondu gulu kallana";
//-------------------------------------------------------
var canvas = document.querySelector('canvas'); //uppsetning á canvas
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var gravity = 0.2 //þyngdarafl í leiknum


function random(min,max) { //segir sig sjálft
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


var keysDown = {};//bý til object sem geymir hvort það sé verið að ýta á takka
document.addEventListener("keydown", function (e) {//bý til eventlistener sem finnur hvaða takki er niðri
    keysDown[e.keyCode] = true;//og bæti takka keycodeinu í keysDown
  }, false);

document.addEventListener("keyup", function (e) {//ef það er sleppt takkanum
    delete keysDown[e.keyCode];//þá er takkanum eytt úr keysDown
  }, false);



function Shape(x, y, velX,velY, exists) { //constructor sem er notaður í: enemies, ball, playerinn og platforms
  this.x = x;
  this.y = y;
  this.velX = 5;
  this.velY = 0;
  this.exists = exists;
}

// define Ball constructor, inheriting from Shape


function Platform(x, y, velX, velY, exists, size) { //platform constuctor búinn til
    Shape.call(this, x, y, velX, velY, exists);
    this.size = size;
    this.velX = -2;
}
Platform.prototype = Object.create(Shape.prototype)
Platform.prototype.constructor = Platform

Platform.prototype.draw = function(){ //platform prototype til að birta platformið á skjáninn.
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

function Enemy(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.velX = -2
    this.color = color;
    this.size = 40;
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
Enemy.prototype.__proto__ = Ball.prototype;
Enemy.prototype.constructor = Enemy;
Enemy.prototype.draw2 = function(fjoldi){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    for (let k = 1; k < fjoldi; k++){
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y- (k*50), this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    
}

Enemy.prototype.update = function(){
    this.x += this.velX;
    this.y += this.velY;
}

Platform.prototype.Update = function() {
    
  if(this.x < -350) {
    this.exists = false;
  }
  this.x += this.velX;
};

// define ball collision detection
Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < enemies.length; j++) {
    if(enemies[j].exists) {
        if (this.y <= enemies[j].y+60 &&
           this.y >= enemies[j].y-140 &&
           this.x <= enemies[j].x+40 &&
           this.x >= enemies[j].x)
            {
                enemies[j].exists = false;
                this.exists = false;
                stig += 1;
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
var canJump = 0;
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

var lif = 3;
EvilCircle.prototype.collisionDetect = function() {
  for(let j = 0; j < enemies.length; j++) {
    if(enemies[j].exists) {
        if (this.y <= enemies[j].y+60 &&
           this.y >= enemies[j].y-140 &&
           this.x <= enemies[j].x &&
           this.x >= enemies[j].x-60)
            {
                enemies[j].exists = false;
                lif -= 1;
            }
    }
  }
};

// define loop that keeps drawing the scene constantly

//var evil = new EvilCircle(random(0,width), random(0,height), true);
var platArray = [];
var enemies = [];
function platforms(){
    let haed = random(700,height-50)
    var plat = new Platform(width,haed,0,0,true,100);
    var enemy = new Enemy(width+300, haed-40, 0,0,true,'rgb(255,255,0)',0);
    enemies.push(enemy);
    platArray.push(plat);
}
function fjBolta(){ //function til að telja hversu mörg skot eru í loftinu
    var counter = 0;
    for(let i in balls){
        if (balls[i].exists == true){
            counter++;
        }
    }
    return counter;
}
var vy = 0;
function loop() {
    console.log(stig);
    if (lif >= 0 && stig < 20){
        let fjBolta1 = fjBolta();
        if(75 in keysDown && fjBolta1 < 1){ //ekki hægt að skjóta nema einni skoti í einu.
            var ball = new Ball(mario.x+38, mario.y-5, 5,0,true,
                                'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')',15);
            balls.push(ball);

        }

        ctx.fillStyle = "rgba(120,120,120,0.5)";
        ctx.fillRect(0,0,width,height);
        mario.setControls();


      for (var i = 0; i < balls.length; i++) {
        if(balls[i].exists) {
          balls[i].draw();
          balls[i].upDate();
          balls[i].collisionDetect();
        }
      }
        for (let i = 2; i < enemies.length; i++){
            if (enemies[i].exists){
                enemies[i].draw2(3);
                enemies[i].update();
            }
        }

        if (mario.y === canvas.height-12){
            canJump = 1;
        }
        else{
            canJump = 0;
        }
        for(var i = 2; i < platArray.length; i++) {
            if(platArray[i].exists) {
                platArray[i].Update();

                if (platArray.length > 2){ 
                    platArray[i].draw();

                    if ((mario.y >= platArray[i].y - 23 &&  //ef mario er ofaná platformi
                        mario.y <= platArray[i].y - 12&&
                        mario.x > platArray[i].x-5 &&
                        mario.x < platArray[i].x + 350) ||

                        //basically ef það er u tvö platforms á skjánum á sama tíma
                        (mario.y >= platArray[i-1].y - 23 && 
                        mario.y <= platArray[i-1].y - 12 &&
                        mario.x > platArray[i-1].x-5 &&
                        mario.x < platArray[i-1].x + 350)
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
                            canJump = 0;
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
        lifstatus.textContent = "Líf: " + lif;
        stigstatus.textContent = "Stig: " + stig;
    }
    else if (lif < 0){
        titill.textContent = "";
        lifstatus.textContent = "";
        stigstatus.textContent = "";
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height)
        ctx.fillStyle = "white";
        ctx.fillText("Þú tapaðir.",(width/2.4),height/2.1);
        ctx.fillText(`Stig: ${stig}`,(width/2.3),height/1.8);
        ctx.font = "25px Arial";
        ctx.fillText("Ýttu á spacebar til að reyna aftur.",(width/2.65),height/1.6);
        if (32 in keysDown){
            lif = 3;
            stig = 0;
        }
    }
    else if (stig >= 20){
        titill.textContent = "";
        lifstatus.textContent = "";
        stigstatus.textContent = "";
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,width,height)
        ctx.fillStyle = "white";
        ctx.fillText("Þú vannst.",(width/2.4),height/2.1);
        ctx.fillText(`Stig: ${stig}`,(width/2.3),height/1.8);
        ctx.font = "25px Arial";
        ctx.fillText("Ýttu á spacebar til að spila aftur.",(width/2.65),height/1.6);
        if (32 in keysDown){
            lif = 3;
            stig = 0;
            platArray = [];
            enemies = [];
            balls = [];
        }
    }
}
setInterval(platforms,2400)
setInterval(loop,5)
