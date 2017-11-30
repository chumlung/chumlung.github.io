class Runner{
	constructor(runnerWidth,runnerHeight){
    this.id = 11;
    this.width = runnerWidth;
    this.height = runnerHeight;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.speed = 2;
    this.image = new Image();
    this.image.src = "spritesheet.png";
    this.canMoveLeft = true;
    this.canMoveRight = true;
    this.canMoveUp = true;
    this.canMoveDown = true;
    this.currentPosition = [12,12];
    this.isFalling = true;
    this.animationCounter = 0;
    this.startIndexX = null;
    this.startIndexY = null;
    this.sign = null;
    this.isIn = null;

  }
  
  draw(startIndexX,startIndexY){
    let frameWidth = this.image.width / 16;
    let frameHeight = this.image.height / 5;
    ctx.drawImage(this.image, (startIndexX + this.sign * Math.floor(this.animationCounter % 4)) * frameWidth,startIndexY * frameHeight,frameWidth - 1, frameHeight - 1, this.x,this.y,this.width,this.height);
    if (this.animationCounter == 4){
      this.animationCounter = 0;
    }
  }
  updatePosition(tileWidth,tileHeight){
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    //this.draw(this.startIndexX,this.startIndexY);
    if (this.dx > 0){
      this.currentPosition[0] = Math.floor(this.x / tileWidth);
      this.animationCounter += 0.25;
      this.startIndexX = 12;
      if (this.isIn == 4){
        this.startIndexY = 1;
      }
      else{
        this.startIndexY = 0;         
      }
      this.sign = 1;
    }
    else if (this.dx < 0){
      this.currentPosition[0] = Math.floor((this.x + this.width) / tileWidth);
      this.animationCounter += 0.25;
      if (this.isIn == 4){
        this.startIndexX = 7;
        this.startIndexY = 1;
      }
      else{
        this.startIndexX = 3;
        this.startIndexY = 0;         
      }
      this.sign = -1;
    }
    if (this.dy > 0){
      this.currentPosition[1] = Math.floor(this.y / tileHeight);
      this.animationCounter += 0.25;
      this.sign = -1;
      if (this.isIn == 3){
        this.startIndexX = 3;
        this.startIndexY = 1;
      }
      else {
        this.startIndexX = 7;
        this.startIndexY = 0;
      }
    }
    else if (this.dy < 0){
      this.currentPosition[1] = Math.floor((this.y + this.height) / tileHeight);
      this.animationCounter += 0.25;
      this.startIndexX = 0;
      this.startIndexY = 1;
      this.sign = 1;
    }
  }
  checkCollision(chaserArray){
    let flag = 0;
    chaserArray.forEach((chaser)=>{
      if (!chaser.isTrapped && this.x + this.width  >= chaser.x && this.x <= chaser.x + chaser.width  && this.y + this.height >= chaser.y && this.y <= chaser.y + chaser.height){
        flag = 1;
      }
    })
    if (flag == 1)
      return true;
  }

  moveUp(){
    if (this.canMoveUp){
      this.dy = -this.speed;
      this.dx = 0;
    }
  }
  moveDown(){
    if(this.canMoveDown){
      this.dy = this.speed;
      this.dx = 0;
    }
  }
  moveLeft(){
    if(this.canMoveLeft){
      this.dx = -this.speed;
      this.dy = 0;
    }
  }
  moveRight(){
    if(this.canMoveRight){
      this.dx = this.speed;
      this.dy = 0;
    }
  }
  dontMove(){
    this.dx = 0;
    this.dy = 0;
  }
  fallDown(){
    keyState = [false,false,false,false]
    this.dx = 0;
    this.dy = this.speed;
  }
  destroyLeftAnimation(){
    this.sign = -1;
    this.animationCounter += 0.25;
    this.draw(3,2)
  }
}