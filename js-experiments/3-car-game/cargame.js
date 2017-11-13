var MainWrapper = document.getElementById("main-wrapper");
var gameArray = [];
var carPosition = ["18.02%","41.92%","67.5%"];
var bulletPosition = ["23.78%","47.13%","72.63%"];
var obstaclePosition = ["15.3%","38.83%","63.73%"];
var startButton = document.createElement("button");
var aboutGame = document.createElement("div");
var resetButton = document.createElement("button");

MainWrapper.style.width ="470px";
MainWrapper.style.height = "600px";
MainWrapper.style.margin = "0px";
MainWrapper.style.padding = "0px";
MainWrapper.style.backgroundImage = "url('mainBG.png')";
MainWrapper.style.backgroundRepeat = "no-repeat";
MainWrapper.overflow = "hidden";
aboutGame.innerHTML = "Press arrow keys to move and Spacebar to shoot";

startButton.style.margin = "235px 180px";
startButton.innerHTML = "Start";
resetButton.style.margin = "400px 180px";
resetButton.innerHTML = "Restart";
MainWrapper.appendChild(aboutGame);
MainWrapper.appendChild(startButton);

startButton.onclick = function(){
  game1 = new Game();
  game1.gameInit();
  game1.velocity = 2;
  gameArray.push(game1);
  MainWrapper.removeChild(startButton);
  MainWrapper.removeChild(aboutGame);
}

resetButton.onclick = function(){
  game1 = new Game();
  game1.gameInit();
  game1.velocity = 2;
  gameArray.push(game1);
  MainWrapper.removeChild(resetButton);
}

function Game(){
	this.velocity = 0;
	this.gameScreen = document.createElement("div");
	this.gameScreen.style.width = "470px";
  this.gameScreen.style.height = "600px";
  this.gameScreen.style.overflow ="hidden";
  this.gameScreen.style.position = "relative";
  this.gameScreen.style.display = "inline-block";
  this.gameScreen.style.backgroundRepeat = "repeat-y";
  this.gameScreen.style.backgroundImage ="url('road.png')";
	this.car = new Car();
  this.bulletArray = [];
  this.obstacleArray = [];
  that = this;

	this.gameInit = function(){
		MainWrapper.appendChild(this.gameScreen);
		this.gameScreen.appendChild(this.car.carElement);
  }
  this.shootBullet = function(){
    this.bullet = new Bullet(this.car.currentPosition);
    this.bulletArray.push(this.bullet);
    this.gameScreen.appendChild(this.bullet.bulletElement);
    var bulletMotion = setInterval(function(){
      that.bulletArray.forEach(function(bullet){
        console.log(bullet.y);
        bullet.bulletElement.style.top = bullet.y + "px";
        bullet.y = bullet.y - 3;
        that.hitObstacle();
      if (bullet.y < 0){
        clearInterval(bulletMotion);
        that.removeBullet(bullet);
      }
      })
    },10)
  }

  this.removeBullet = function(bullet){
      this.gameScreen.removeChild(bullet.bulletElement);
      this.bulletArray.splice(bullet,1);
  }
  this.createObstacles = function(){
    this.obstacle = new Obstacle(Math.floor(Math.random()*3));
    this.obstacleArray.push(this.obstacle);
    this.gameScreen.appendChild(this.obstacle.obstacleElement);
  }
  this.removeObstacle = function(obstacle){
    this.gameScreen.removeChild(this.obstacle.obstacleElement);
    this.obstacleArray.splice(obstacle,1);   
  }

  this.detectCollision = function(){
    this.obstacleArray.forEach(function(obstacle){
      if ((obstacle.y + 80 >= that.car.y) && (obstacle.currentPosition == that.car.currentPosition)){
        that.car.carElement.style.backgroundImage = "url('blast.png')";
        clearInterval(movingObstacles);
        MainWrapper.removeChild(game1.gameScreen);
        gameArray.splice(game1,1);
        MainWrapper.appendChild(resetButton);

      }
    })
  }
  this.hitObstacle = function(){
    that.obstacleArray.forEach(function(obstacle){
      that.bulletArray.forEach(function(bullet){
        if((obstacle.y + 70 >= bullet.y) && (obstacle.currentPosition == bullet.currentPosition)){
          obstacle.obstacleElement.style.backgroundImage = "url('blast.png')";
          that.removeObstacle(obstacle);
          that.removeBullet(bullet);
        }
      })
    })
  }

  movingObstacles = setInterval(function(){
    that.obstacleArray.forEach(function(obstacle){
    obstacle.obstacleElement.style.top = obstacle.y + "px";
    obstacle.y = obstacle.y + 5;
    that.detectCollision();
    if (obstacle.y>600){
      that.removeObstacle(obstacle);
    }
  })
  },5)
}


function Car(){

	this.y = 455;
  this.currentPosition = 1;
	this.left = carPosition[this.currentPosition];
	this.carElement = document.createElement("div");
  this.carElement.style.width = "70px";
  this.carElement.style.height = "145px";
  this.carElement.style.position = "absolute";
  this.carElement.style.left = this.left;
  this.carElement.style.top = this.y +"px";
	this.carElement.style.backgroundImage = "url('car.png')";
  that = this;

	this.moveRight = function(){
		if (this.currentPosition < 2) {
      this.currentPosition =  this.currentPosition + 1;
			this.carElement.style.left = carPosition[this.currentPosition]; 
		}
	}

	this.moveLeft = function(){
		if(this.currentPosition > 0){
			this.currentPosition = this.currentPosition - 1;
			this.carElement.style.left = carPosition[this.currentPosition];
		}
	}


} 

function Bullet(position){
  this.left = bulletPosition[position];
  this.currentPosition = position;
  this.y = 460;
  this.bulletElement = document.createElement("div");
  this.bulletElement.style.width = "20px";
  this.bulletElement.style.height = "72px";
  this.bulletElement.style.left = this.left;
  this.bulletElement.style.position = "absolute";
  this.bulletElement.style.backgroundImage = "url('bullet.png')";
  this.bulletElement.style.top = this.y + "px";

}

function Obstacle(randomValue){
	this.y = -120;
  this.currentPosition = randomValue;
	this.left = obstaclePosition[randomValue];
  this.obstacleElement = document.createElement("div");
  this.obstacleElement.style.width = "95px";
  this.obstacleElement.style.height = "95px";
  this.obstacleElement.style.left = this.left;
  this.obstacleElement.style.position = "absolute";
  this.obstacleElement.style.backgroundImage = "url('obstacle.png')";
  this.obstacleElement.style.top = this.y + "px";

}

document.onkeydown = function(event){
	var code = event.keyCode;
  switch(code){
   case 32:
    gameArray[0].shootBullet();
   break;
   case 37:
    gameArray[0].car.moveLeft();
   break;
   case 39:
    gameArray[0].car.moveRight();
   break;

 }
}

var x = 0;

var gaming = setInterval(function(){
  if (gameArray.length > 0){
	game1.gameScreen.style.backgroundPosition = "center top " + x + "px";
	x = x + game1.velocity;	
  if (x > 1378){
    x = 0;
  }
  if(game1.obstacleArray<=6){
    game1.createObstacles();
  }
  }
},10);
