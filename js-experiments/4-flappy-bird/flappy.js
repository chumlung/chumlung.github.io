MainWrapper = document.getElementById("main-wrapper");
heightTopValues = ["75px","175px","275px","10px","325px"];
heightBottomValues = ["250px","150px","50px","315px","0px"];
height = 0;
gameArray = [];
MainWrapper.style.height = "450px";
MainWrapper.style.width = "800px";
MainWrapper.style.backgroundImage = "url('gamebackground.png')";
scoreBoard = document.createElement("div");


startButton = document.createElement("button");
startButton.innerHTML = "Start";
MainWrapper.appendChild(startButton);

startGame = function(){
  let game1 = new Game();
  gameArray.push(game1);
  game1.gameInit();
  document.onkeydown =  function(event){
  if (event.keyCode == 32){
    game1.flappybird.moveUp();
  }
  }
}

endGame = function(){
  MainWrapper.appendChild(scoreBoard);
  scoreBoard.innerHTML = "Your Score is:" + gameArray[0].score;
  MainWrapper.removeChild(gameArray[0].gameElement);
  gameArray.splice(0,1);
  MainWrapper.appendChild(restartButton);
}

startButton.onclick = function(){
  MainWrapper.removeChild(startButton);
  startGame();
}

restartButton = document.createElement("button");
restartButton.innerHTML = "Restart";
restartButton.onclick = function(){
  MainWrapper.removeChild(scoreBoard);
  MainWrapper.removeChild(restartButton);
  startGame();
}


class Game{
  constructor(){
   this.score = 0;
   this.gameElement = document.createElement("div");
   this.gameElement.style.height = "450px";
   this.gameElement.style.width = "800px";
   this.gameElement.style.backgroundImage = "url('gamebackground.png')"
   this.gameElement.style.position = "relative";
   this.gameElement.style.overflow = "hidden";
   MainWrapper.appendChild(this.gameElement);
   this.obstacleTopArray = [];
   this.obstacleBottomArray = [];
   
  }
  gameInit() {
    this.flappybird = new Bird();
    this.gameElement.appendChild(this.flappybird.birdElement);
    let counter = 0;
    this.gamePlay = setInterval(() =>{
      if((counter%80) == 0){ 
        if (counter >= 180){counter = 0};
        height = Math.floor(Math.random()*5);
        this.obstacle = new Obstacle();
        this.obstacleTop = new ObstacleTop(this.obstacle.x,this.obstacle.y,this.obstacle.obstacleElement);
        this.obstacleBottom = new ObstacleBottom(this.obstacle.x,this.obstacle.y,this.obstacle.obstacleElement);
        this.obstacleTopArray.push (this.obstacleTop);
        this.gameElement.appendChild(this.obstacleTop.obstacleElement);
        this.obstacleBottomArray.push (this.obstacleBottom);
        this.gameElement.appendChild(this.obstacleBottom.obstacleElement);
      }
      this.flappybird.y = this.flappybird.y + 5;
      this.flappybird.birdElement.style.top = this.flappybird.y + "px";
      this.obstacleTopArray.forEach((obstacle) =>{
        obstacle.obstacleElement.style.left = obstacle.x + "px";
        obstacle.x = obstacle.x - 5;
       if (obstacle.x + 138 <= 0){
        this.score++;
        this.removeTopObstacle(obstacle);
       }
      })
      this.obstacleBottomArray.forEach((obstacle) =>{
      obstacle.obstacleElement.style.left = obstacle.x + "px";
      obstacle.x = obstacle.x - 5;
       if (obstacle.x + 138 <= 0){
        this.score++;
        this.removeBottomObstacle(obstacle);
       }
      })
      this.detectCollision();
      counter++;
    },40) 
  }
  removeTopObstacle(obstacle){
    this.gameElement.removeChild(obstacle.obstacleElement);
    this.obstacleTopArray.splice(this.obstacleTopArray.indexOf(obstacle),1);
  }
  removeBottomObstacle(obstacle){
    this.gameElement.removeChild(obstacle.obstacleElement);
    this.obstacleBottomArray.splice(this.obstacleBottomArray.indexOf(obstacle),1);

  }
  detectCollision(){
    let flag = 0;
    this.obstacleTopArray.forEach((obstacle) =>{
      if(((this.flappybird.x + 50) > obstacle.x) && (this.flappybird.y < parseInt(obstacle.obstacleElement.style.height))){
        console.log("top");
        flag = 1;
      }
    })
    this.obstacleBottomArray.forEach((obstacle) =>{
      if(((this.flappybird.x + 50) > obstacle.x) && (this.flappybird.y + 30 > (450 - parseInt(obstacle.obstacleElement.style.height)))){
        flag = 1;
      }
    })
    if (flag == 1 || this.detectOutofBounds()){
      clearInterval(this.gamePlay);
      endGame();
    }
  }

  detectOutofBounds(){
    if (this.flappybird.y < 0 || (this.flappybird.y + 30) > 450){
      return 1;
    }
  }

}
class Bird{
  constructor(){
    this.x = 20;
    this.y = 100;
    this.birdElement = document.createElement("div");
    this.birdElement.style.height = "30px";
    this.birdElement.style.width = "50px";
    this.birdElement.style.position = "absolute";
    this.birdElement.style.backgroundImage = "url('flappybird.png')";
    this.birdElement.style.left = this.x + "px";
    this.birdElement.style.top = this.y + "px";
  }

  moveUp(){
    this.y = this.y - 50;
  }
	
}
class Obstacle{
	constructor(){
    this.x = 800;
    this.y = 0;
    this.obstacleElement = document.createElement("div");
    this.obstacleElement.style.backgroundImage = "url('obstacleTop.png')";
    this.obstacleElement.style.width = "138px";
    this.obstacleElement.style.position = "absolute";
    this.obstacleElement.style.left = this.x + "px";
  }
}

class ObstacleTop extends Obstacle{
  constructor(x,y,obstacleElement){
    super();
    this.obstacleElement.style.height = heightTopValues[height];
    this.obstacleElement.style.top = this.y + "px";
  }
}
class ObstacleBottom extends Obstacle{
  constructor(x,y,obstacleElement){
    super();
    this.obstacleElement.style.height = heightBottomValues[height];
    this.obstacleElement.style.bottom = this.y + "px";
  }
}





