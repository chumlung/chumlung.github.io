var MainWrapper = document.getElementById("main-wrapper");
var gameArray = [];
var carPosition = ["18.02%","41.92%","67.5%"];
var bulletPosition = ["23.78%","47.13%","72.63%"];
var obstaclePosition = ["15.3%","38.83%","63.73%"];
var startButton = document.createElement("button");
var aboutGame = document.createElement("div");
var resetButton = document.createElement("button");
var x = 0;
var counter = 0;

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
  game1.velocity = 5;
  gameArray.push(game1);
  MainWrapper.removeChild(startButton);
  MainWrapper.removeChild(aboutGame);
}

resetButton.onclick = function(){
  game1 = new Game();
  game1.gameInit();
  game1.velocity = 5;
  gameArray.push(game1);
  MainWrapper.removeChild(resetButton);
}

function Game(){
	this.velocity = 0;
  this.canShootFlag = 1;
  this.bulletCounter = 0;
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
  this.bulletStatus = document.createElement("div");
  this.bulletStatus.style.width = "20px";
  this.bulletStatus.style.height = "72px";
  this.bulletStatus.style.left = "20px";
  this.bulletStatus.style.position = "absolute";
  this.bulletStatus.style.backgroundImage = "url('bullet.png')";
  this.bulletStatus.style.top = "20px";
  this.gameScreen.appendChild(this.bulletStatus);

  that = this;

	this.gameInit = function(){
		MainWrapper.appendChild(this.gameScreen);
		this.gameScreen.appendChild(this.car.carElement);
    gaming();
  }
  this.shootBullet = function(){
    if (this.canShootFlag == 1){
     this.bullet = new Bullet(this.car.currentPosition);
     this.bulletArray.push(this.bullet);
     this.gameScreen.appendChild(this.bullet.bulletElement);
     this.canShootFlag = 0;
    }
  }

  this.removeBullet = function(bullet){
      this.gameScreen.removeChild(bullet.bulletElement);
      this.bulletArray.splice(this.bulletArray.indexOf(bullet),1);
  }
  this.createObstacles = function(){
    var firstPosition = (Math.floor(Math.random()*3));
    this.obstacle1 = new Obstacle(firstPosition);
    this.obstacleArray.push(this.obstacle1);
    this.gameScreen.appendChild(this.obstacle1.obstacleElement);
    var secondPosition = (Math.floor(Math.random()*3));
    if (firstPosition == secondPosition){
      secondPosition = (secondPosition + 1) % 2;
    }
    this.obstacle2 = new Obstacle(secondPosition);
    this.obstacleArray.push(this.obstacle2);
    this.gameScreen.appendChild(this.obstacle2.obstacleElement);
  }
  this.removeObstacle = function(){
    this.obstacleArray.forEach (function(obstacle){
      if (obstacle.status == 0){
        that.gameScreen.removeChild(obstacle.obstacleElement);
        that.obstacleArray.splice(that.obstacleArray.indexOf(obstacle),1); 
      }
    })  
  }

  this.detectCollision = function(){
    this.obstacleArray.forEach(function(obstacle){
      if ((obstacle.y + 80 >= that.car.y) && (obstacle.currentPosition == that.car.currentPosition)){
        that.car.carElement.style.backgroundImage = "url('blast.png')";
         setTimeout(function(){
          MainWrapper.removeChild(game1.gameScreen);
          gameArray.splice(game.Array.indexOf(game1),1);
          MainWrapper.appendChild(resetButton);
         },500)
         clearInterval(gaming);
      }
    })
  }
  this.hitObstacle = function(){
    that.obstacleArray.forEach(function(obstacle){
      that.bulletArray.forEach(function(bullet){
        if((obstacle.y + 70 >= bullet.y) && (obstacle.currentPosition == bullet.currentPosition)){
          obstacle.obstacleElement.style.backgroundImage = "url('blast.png')";
          obstacle.status = 0;
          that.removeObstacle();
          that.removeBullet(bullet);
        }
      })
    })
  }
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
  this.status = 1;
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



var gaming = setInterval(function(){
  if (gameArray.length > 0){
	 game1.gameScreen.style.backgroundPosition = "center top " + x + "px";
	 x = x + game1.velocity;	
   if (x > 1378){
   x = 0;
   }
  that.bulletArray.forEach(function(bullet){
    bullet.bulletElement.style.top = bullet.y + "px";
    bullet.y = bullet.y - 3;
    that.hitObstacle();
    if (bullet.y < 0){
      that.removeBullet(bullet);
    }
  })
  that.obstacleArray.forEach(function(obstacle){
    obstacle.obstacleElement.style.top = obstacle.y + "px";
    obstacle.y = obstacle.y + 8;
    that.detectCollision();
    if (obstacle.y>600){
      obstacle.status = 0;
    }
    that.removeObstacle();
  })
   if((counter%80) == 0){
    counter = 0;
    game1.createObstacles();
   }
  that.bulletCounter++;
  if ((that.canShootFlag == 0) && (that.bulletCounter % 200 == 0)){
    that.bulletCounter = 0;
    that.canShootFlag = 1;
  }
  if (that.canShootFlag == 1){
    that.bulletStatus.style.display = "block";
  }
  else
  {
    that.bulletStatus.style.display = "none";
  }
  }
  counter++;
  
},10);
