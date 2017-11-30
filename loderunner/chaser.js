class Chaser{
	constructor(chaserWidth,chaserHeight,xIndex,yIndex){
    this.id = 22;
    this.width = chaserWidth;
    this.height = chaserHeight;
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.trappedCounter = 0;
    this.speed = 1;
    this.image = new Image();
    this.image.src = "spritesheet.png";
    this.isTrapped = false;
    this.canMoveLeft = true;
    this.canMoveRight = true;
    this.canMoveUp = true;
    this.canMoveDown = true;
    this.currentPosition = [xIndex,yIndex];
    this.isFalling = true;
    this.animationCounter = 0;
    this.startIndexX = 3;
    this.startIndexY = 3;
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
    this.draw(this.startIndexX,this.startIndexY);
    if (this.dx > 0){
      this.currentPosition[0] = Math.floor(this.x / tileWidth);
      this.animationCounter += 0.25;
      this.startIndexX = 12;
      if (this.isIn == 4){
        this.startIndexY = 4;
      }
      else{
        this.startIndexY = 3;         
      }
      this.sign = 1;
    }
    else if (this.dx < 0){
      this.currentPosition[0] = Math.floor((this.x + this.width) / tileWidth);
      this.animationCounter += 0.25;
      if (this.isIn == 4){
        this.startIndexX = 7;
        this.startIndexY = 4;
      }
      else{
        this.startIndexX = 3;
        this.startIndexY = 3;         
      }
      this.sign = -1;
    }
    if (this.dy > 0){
      this.currentPosition[1] = Math.floor(this.y / tileHeight);
      this.animationCounter += 0.25;
      this.sign = -1;
      if (this.isIn == 3){
        this.startIndexX = 3;
        this.startIndexY = 4;
      }
      else {
        this.startIndexX = 7;
        this.startIndexY = 3;
      }
    }
    else if (this.dy < 0){
      this.currentPosition[1] = Math.floor((this.y + this.height) / tileHeight);
      this.animationCounter += 0.25;
      this.startIndexX = 0;
      this.startIndexY = 4;
      this.sign = 1;
    }

  }

  findRunner(runner,spriteArray,mapWidth,mapHeight,tileWidth,tileHeight){
    let distanceX = runner.x - this.x;
    let distanceY = runner.y - this.y;
    let currentIndex = this.currentPosition[1] * mapWidth + this.currentPosition[0];
    if (distanceY > 0 && this.isIn != 3 && this.isIn != 4){
      //search for a ladder below------------------------------------------------------
      let foundLeft = 0;
      let foundRight = 0;
      for (let i = 0; i < spriteArray.length; i++){
        let sprite = spriteArray[i];
        let spriteXValue = sprite.xPosition / tileWidth;
        let spriteYValue = sprite.yPosition / tileHeight;
          //search left
        if (spriteYValue == this.currentPosition[1] + 1){
          for (let j = this.currentPosition[0] - 1; j > 0;j--){
            if(spriteXValue == j && sprite.id == 3){
              //console.log(spriteXValue + " " + spriteYValue + "left")
              foundLeft = this.currentPosition[0] - spriteXValue;
              //console.log(foundLeft + "left");
              break;
            }
          }
          //search right
          for (let j = this.currentPosition[0] + 1; j < mapWidth; j++){
            if (spriteXValue == j && sprite.id == 3){
              //console.log(spriteXValue + " " + spriteYValue + "right")
              //console.log("found right")
              foundRight = spriteXValue - this.currentPosition[0];
              //console.log(foundRight + "right")
              break;
            }
          }
        }
      }
      if(foundLeft != 0 && foundRight != 0){
        if (foundLeft < foundRight){
          //console.log("should go left both"); 
          this.moveLeft();
          if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
          this.updatePosition(tileWidth,tileHeight);
        }
        else if (foundLeft > foundRight){
          //console.log("should go right both");
          this.moveRight();
          if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
          this.updatePosition(tileWidth,tileHeight);            
        }
      }
      else if(foundLeft == 0 && foundRight != 0){
        //console.log("should go right")
        this.moveRight();
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
        this.updatePosition(tileWidth,tileHeight);    
      }
      else if(foundLeft!= 0 && foundRight == 0){
        //console.log("should go left")
        this.moveLeft();
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
        this.updatePosition(tileWidth,tileHeight);          
      }
    }
    else if (this.isIn == 3){
      //is already on a ladder----------------------------------------------------
      if (distanceY > 0){
        //console.log("should go down")
        //console.log(this.currentPosition)
        this.moveDown();          
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
          this.updatePosition(tileWidth,tileHeight);
        else if(distanceX > 0){
          this.moveRight();
          this.updatePosition(tileWidth,tileHeight);
        }
        else if(distanceX < 0){
          this.moveLeft();
          //if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
          this.updatePosition(tileWidth,tileHeight)
        }
        
      }
      if (distanceY < 0){
        //console.log("should go up")
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight)){
          this.moveUp();
          this.updatePosition(tileWidth,tileHeight);
        }
        else if(distanceX > 0){
          this.moveRight();
          this.updatePosition(tileWidth,tileHeight);
        }
        else if(distanceX < 0){
          this.moveLeft();
          this.updatePosition(tileWidth,tileHeight)
        }
      }
    }
    else if (this.isIn == 4){
      if (distanceX > 0){
        this.moveRight();
        this.updatePosition(tileWidth,tileHeight);
      }
      else if (distanceX < 0){
        this.moveLeft();
        this.updatePosition(tileWidth,tileHeight);
      }
      if(distanceY > 0 && distanceX == 0){
        this.moveDown();
        this.updatePosition(tileWidth,tileHeight);
      }
    }
    else if (distanceY < 0 && this.isIn != 3 && this.isIn != 4){
      //search for ladder in current floor---------------------------------------------
      let foundLeft = 0;
      let foundRight = 0;
      for (let i = 0; i < spriteArray.length; i++){
        let sprite = spriteArray[i];
        let spriteXValue = sprite.xPosition / tileWidth;
        let spriteYValue = sprite.yPosition / tileHeight;
          //search left
        if (spriteYValue == this.currentPosition[1] ){
          for (let j = this.currentPosition[0] - 1; j > 0;j--){
            if(spriteXValue == j && sprite.id == 3){
              foundLeft = this.currentPosition[0] - spriteXValue;
              //console.log(foundLeft +"left current")
              break;
            }
          }
          //search right
          for (let j = this.currentPosition[0] + 1; j < mapWidth; j++){
            if (spriteXValue == j && sprite.id == 3){
              foundRight = spriteXValue - this.currentPosition[0];
              //console.log(foundRight + "right current")
              break;
            }
          }
        }
      }
      if(foundLeft!=0 && foundRight!=0){
        if (foundLeft < foundRight){
          //console.log("should go left both");
          this.moveLeft();
          if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
          this.updatePosition(tileWidth,tileHeight);
        }
        else if (foundLeft > foundRight){
          //console.log("should go right both");            
          this.moveRight();
          if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
          this.updatePosition(tileWidth,tileHeight);
        }
      }
      else if(foundLeft == 0 && foundRight != 0){
        //console.log("should go right")    
        this.moveRight();
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
        this.updatePosition(tileWidth,tileHeight);
      }
      else if(foundLeft != 0 && foundRight == 0){
        //console.log("should go left")          
        this.moveLeft();
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
        this.updatePosition(tileWidth,tileHeight);
      }
    }
    if (distanceY == 0 && distanceX!= 0 && this.isIn != 4){
    //console.log(distanceY + " " + distanceX)
      if(distanceX > 0){
        this.moveRight();
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
        this.updatePosition(tileWidth,tileHeight);
      }
      else if(distanceX < 0){
        this.moveLeft();
        if(!this.checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight))
        this.updatePosition(tileWidth,tileHeight);
      }
    }
  }

  indexToXY (index,mapWidth){
    let x = index % mapWidth;
    let y = Math.floor(index / mapWidth);
    return [x,y];
  }

  XYToIndex (x,y,mapWidth){
   return y * mapWidth + x;
  }

  checkTargetTile(spriteArray,mapWidth,tileWidth,tileHeight){
    let sprites = [];
    let currentIndex = this.XYToIndex(this.currentPosition[0],this.currentPosition[1],mapWidth);
    if ((this.x % tileWidth <= 4) || (this.y % tileHeight <= 2)){
      if (this.dx > 0){
        sprites[0] = currentIndex + 1;
      }
      else if (this.dx < 0){
        sprites[0] = currentIndex - 1;
      }
      else if (this.dy > 0){
        sprites[0] = currentIndex + mapWidth;
      }
      else if (this.dy < 0){
        sprites[0] = currentIndex - mapWidth;
      }
      for(let i = 0;i < spriteArray.length; i++){
        let sprite = spriteArray[i];
        if (sprite.index == sprites[0]){
          if (sprite.id == 1 || ((sprite.id == 2 && !sprite.destroyed) )){
            return true;
            break;
          }
          else 
            return false;
        }
      }
    }
    else{
      if (this.dx > 0){
        sprites[0] = this.XYToIndex(this.currentPosition[0] + 1,Math.floor(this.y / tileHeight),mapWidth);
        sprites[1] = this.XYToIndex(this.currentPosition[0] + 1,Math.ceil(this.y / tileHeight),mapWidth);
      }
      else if (this.dx < 0){
        sprites[0] = this.XYToIndex(this.currentPosition[0] - 1,Math.floor(this.y / tileHeight),mapWidth);
        sprites[1] = this.XYToIndex(this.currentPosition[0] - 1,Math.ceil(this.y / tileHeight),mapWidth);
      }
      else if (this.dy > 0){
        sprites[0] = this.XYToIndex(Math.floor(this.x / tileWidth),this.currentPosition[1] + 1,mapWidth);
        sprites[1] = this.XYToIndex(Math.ceil(this.x / tileWidth),this.currentPosition[1] + 1,mapWidth);
      }
      else if (this.dy < 0){
        sprites[0] = this.XYToIndex(Math.floor(this.x / tileWidth),this.currentPosition[1] - 1,mapWidth);
        sprites[1] = this.XYToIndex(Math.ceil(this.x / tileWidth),this.currentPosition[1] - 1,mapWidth);
      }
      let flag1 = 0;
      let flag2 = 0;
      for(let i = 0;i < spriteArray.length; i++){
        let sprite = spriteArray[i];
        if (sprite.index == sprites[0]){
          if ((sprite.id == 1 || sprite.id == 2) && !sprite.destroyed){
            flag1 = 1;
          }
        }
        if (sprite.index == sprites[1]){
          if ((sprite.id == 1 || sprite.id == 2) && !sprite.destroyed){
            flag2 = 1;
          }
        }
      }
      if (flag1 == 1 || flag2 == 1){
        return true;
      }
      else
        return false;
    }
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
    if(!this.isFalling && this.canMoveLeft){
      this.dx = -this.speed;
      this.dy = 0;
    }
  }
  moveRight(){
    if(!this.isFalling && this.canMoveRight){
      this.dx = this.speed;
      this.dy = 0;
    }
  }
  fallDown(){
    this.dx = 0;
    this.dy = this.speed;
  }
  dontMove(){
    this.dx = 0;
    this.dy = 0;
  }
  climbUp(runnerx,tileWidth,tileHeight){
    for(let i = 0; i < 32;i++){
      this.moveUp();
      this.updatePosition(tileWidth,tileHeight);
    }
    if ((runnerx - this.x) > 0){
      for(let i = 0; i < 32;i++){
        this.moveRight();
        this.updatePosition(tileWidth,tileHeight);
      }
    }
    if ((runnerx - this.x) < 0){
      for(let i = 0; i < 32;i++){
        this.moveLeft();
        this.updatePosition(tileWidth,tileHeight);
      }
    }
  }
}