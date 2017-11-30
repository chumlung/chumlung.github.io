class GameWorld{

  constructor(mapWidth,mapHeight){
    this.map_W = mapWidth;
    this.map_H = mapHeight;
    this.tile_H = Math.floor(canvas.height / this.map_H);
    this.tile_W = Math.floor(canvas.width / this.map_W);
    this.gameState = "start_menu";
    this.spriteArray = [];
    this.chaserArray = [];
    this.sandArray = [];
  }
  gameInit(tileMap,deactivatedtile1,deactivatedtile2,chaserIndex,sandIndex){
    message.innerHTML = "";
    this.levelMap = tileMap;
    this.deactivatedIndex = [deactivatedtile1,deactivatedtile2];
    this.runner = new Runner(this.tile_W - 4,this.tile_H - 2);
    this.runner.x = this.runner.currentPosition[0] * this.tile_W;
    this.runner.y = this.runner.currentPosition[1] * this.tile_H;
    for (let i = 0;i<chaserIndex.length;i++){
      let position = this.indexToXY(chaserIndex[i],this.map_W);
      this.chaser = new Chaser(this.tile_W - 4,this.tile_H - 2,position[0],position[1]);
      this.chaser.x = this.chaser.currentPosition[0] * this.tile_W;
      this.chaser.y = this.chaser.currentPosition[1] * this.tile_H;
      this.chaserArray.push(this.chaser);    
    }
    // this.chaser1.x = this.chaser1.currentPosition[0] * this.tile_W;
    // this.chaser1.y = this.chaser1.currentPosition[1] * this.tile_H;
    // this.chaser2 = new Chaser(this.tile_W - 4,this.tile_H - 2,12,6);
    // this.chaser2.x = this.chaser2.currentPosition[0] * this.tile_W;
    // this.chaser2.y = this.chaser2.currentPosition[1] * this.tile_H;
    // this.chaserArray.push(this.chaser2);
    // this.chaser3 = new Chaser(this.tile_W - 4,this.tile_H - 2,25,10);
    // this.chaser3.x = this.chaser3.currentPosition[0] * this.tile_W;
    // this.chaser3.y = this.chaser3.currentPosition[1] * this.tile_H;
    // this.chaserArray.push(this.chaser3);

    for (let i = 0;i<sandIndex.length;i++){
    this.sand = new Sand(sandIndex[i],this.map_W,this.tile_W,this.tile_H);
    this.sandArray.push(this.sand);   
    }

    // this.sand = new Sand(35,this.map_W,this.tile_W,this.tile_H);
    // this.sandArray.push(this.sand);
    // this.sand = new Sand(114,this.map_W,this.tile_W,this.tile_H);
    // this.sandArray.push(this.sand);
    // this.sand = new Sand(308,this.map_W,this.tile_W,this.tile_H);
    // this.sandArray.push(this.sand);
    // this.sand = new Sand(325,this.map_W,this.tile_W,this.tile_H);
    // this.sandArray.push(this.sand);
    // this.sand = new Sand(378,this.map_W,this.tile_W,this.tile_H);
    // this.sandArray.push(this.sand);

    let mapIndex = 0;
      for (var i = 0; i < this.map_H;i++){
        for (var j= 0; j < this.map_W; j++,mapIndex++){
          let tile_x = j * this.tile_W;
          let tile_y = i * this.tile_H;
          if (this.levelMap[mapIndex] == 1){
            let block = new Sprite(1,"block.png",false,false,true,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            this.spriteArray.push(block);
          }
          else if (this.levelMap[mapIndex] == 2){
            let brick = new Sprite(2,"brick.png",false,false,true,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            this.spriteArray.push(brick);
          }
          else if (this.levelMap[mapIndex] == 3 && mapIndex!= this.deactivatedIndex[0] && mapIndex!= this.deactivatedIndex[1]){
            let ladder = new Sprite(3,"ladder.png",false,true,true,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            this.spriteArray.push(ladder);
          }
          else if (this.levelMap[mapIndex] == 3 || mapIndex == this.deactivatedIndex[0] || mapIndex == this.deactivatedIndex[1]){
            let ladder = new Sprite(3,"ladder.png",false,true,false,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            this.spriteArray.push(ladder);
          }
          else if (this.levelMap[mapIndex] == 4){
            let pipe = new Sprite(4,"pipe.png",false,true,true,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            this.spriteArray.push(pipe);
          }
      }
    }
  }

  endGame(){
    let count = this.spriteArray.length;
    this.chaserArray.splice(0,3);
    this.sandArray.splice(0,3);
    this.spriteArray.splice(0,count);
  }
  drawWorld(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    this.spriteArray.forEach((sprite)=>{
      if (sprite.id == 0){
      }
      else if (!sprite.destroyed && sprite.activated){
        sprite.draw(sprite.xPosition,sprite.yPosition,sprite.width,sprite.height);
      }
    })
    this.runner.draw(this.runner.startIndexX,this.runner.startIndexY);
    this.chaserArray.forEach((chaser)=>{
      chaser.draw(chaser.startIndexX,chaser.startIndexY);       
    }) 
    this.sandArray.forEach((sand)=>{
      sand.draw();
    })
  }
  drawMenu(menumap){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    let mapIndex = 0;
      for (var i = 0; i < this.map_H;i++){
        for (var j= 0; j < this.map_W; j++,mapIndex++){
          let tile_x = j * this.tile_W;
          let tile_y = i * this.tile_H;
          if (menumap[mapIndex] == 1){
            let block = new Sprite(1,"block.png",false,false,true,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            block.draw(block.xPosition,block.yPosition,block.width,block.height);
          }
          if (menumap[mapIndex] == 2){
            let brick = new Sprite(2,"brick.png",false,false,true,tile_x,tile_y,this.tile_W,this.tile_H,mapIndex);
            brick.draw(brick.xPosition,brick.yPosition,brick.width,brick.height);
          }
          if (menumap[mapIndex] == 5){
            let enter = new Sprite(2,"pressEnter.png",false,false,true,tile_x,tile_y,400,28,mapIndex);
            enter.draw(enter.xPosition,enter.yPosition,enter.width,enter.height);
          }
        }
      }  
  }
  // drawLevelClear(){
  //   ctx.fillStyle = "#000000";
  //   ctx.fillRect(0,0,canvas.width,canvas.height);
  //   for (let i = 0;i<5;i++){
  //     if (i = 2){
  //       let ladder = new Sprite(3,"ladder.png",false,true,false,i*this.tile_W,480,this.tile_W,this.tile_H,0);
  //       ladder.draw(ladder.xPosition,ladder.yPosition,ladder.width,ladder.height)
  //     }
  //     let brick = new Sprite(2,"brick.png",false,false,true,i*this.tile_W,480,this.tile_W,this.tile_H,0);      
  //     brick.draw(brick.xPosition,brick.yPosition,brick.width,brick.height);
  //   }
  //   this.runner.x = 3*this.tile_W;
  //   this.runner.y = 450;
  //   this.runner.draw(8,1);
  //   ctx.fillRect(3*this.tile_W,450,this.runner.width,this.runner.height);
  //   this.runner.animationCounter += 0.25;

  // }

  indexToXY (index,mapWidth){
    let x = index % mapWidth;
    let y = Math.floor(index / mapWidth);
    return [x,y];
  }
  XYToIndex (x,y,mapWidth){
   return y * mapWidth + x;
  }
  findCharacter(character){
    let characterIsIn = this.XYToIndex(character.currentPosition[0],character.currentPosition[1],this.map_W);
    character.isIn = this.levelMap[characterIsIn];
    for (let i = 0; i < this.spriteArray.length; i++){
      let sprite = this.spriteArray[i];
      if (sprite.id == 3 && sprite.activated){
        if ((character.y + character.height >= sprite.yPosition && character.y < sprite.yPosition + sprite.height) && (character.x >= sprite.xPosition && character.x + character.width < sprite.xPosition + sprite.width)){
          character.isIn = 3;
        }
      }
    }
    if(character.isIn == 3 || character.isIn == 4){
      character.isFalling = false;
    }
    //console.log(character.isTrapped)
    if(character.id == 22 && character.isIn == 2){
      character.isFalling = false;
      character.dontMove();
      character.isTrapped = true;
    }
    if (character.id == 22 && character.isIn == 0){
      character.trappedCounter = 0;
      character.isTrapped = false;
    }    
  }

  checkTargetTile(character){
    let sprites = [];
    let characterIndex = this.XYToIndex(character.currentPosition[0],character.currentPosition[1],this.map_W);
    if ((character.x % this.tile_W <= 4) || (character.y % this.tile_H <= 2)){
      if (character.dx > 0){
        sprites[0] = characterIndex + 1;
      }
      else if (character.dx < 0){
        sprites[0] = characterIndex - 1;
      }
      else if (character.dy > 0){
        sprites[0] = characterIndex + this.map_W;
      }
      else if (character.dy < 0){
        sprites[0] = characterIndex - this.map_W;
      }
      for(let i = 0;i < this.spriteArray.length; i++){
        let sprite = this.spriteArray[i];
        if (sprite.index == sprites[0]){
          if (sprite.id == 1 || ((sprite.id == 2 && !sprite.destroyed))){
            return true;
            break;
          }
          else 
            return false;
        }
      }
    }
    else{
      if (character.dx > 0){
        sprites[0] = this.XYToIndex(character.currentPosition[0] + 1,Math.floor(character.y / this.tile_H),this.map_W);
        sprites[1] = this.XYToIndex(character.currentPosition[0] + 1,Math.ceil(character.y / this.tile_H),this.map_W);
      }
      else if (character.dx < 0){
        sprites[0] = this.XYToIndex(character.currentPosition[0] - 1,Math.floor(character.y / this.tile_H),this.map_W);
        sprites[1] = this.XYToIndex(character.currentPosition[0] - 1,Math.ceil(character.y / this.tile_H),this.map_W);
      }
      else if (character.dy > 0){
        sprites[0] = this.XYToIndex(Math.floor(character.x / this.tile_W),character.currentPosition[1] + 1,this.map_W);
        sprites[1] = this.XYToIndex(Math.ceil(character.x / this.tile_W),character.currentPosition[1] + 1,this.map_W);
      }
      else if (character.dy < 0){
        sprites[0] = this.XYToIndex(Math.floor(character.x / this.tile_W),character.currentPosition[1] - 1,this.map_W);
        sprites[1] = this.XYToIndex(Math.ceil(character.x / this.tile_W),character.currentPosition[1] - 1,this.map_W);
      }
      let flag1 = 0;
      let flag2 = 0;
      for(let i = 0;i < this.spriteArray.length; i++){
        let sprite = this.spriteArray[i];
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

  checkGravity(character){
    if (character.isFalling){
      //console.log(this.checkTargetTile(character))
      character.fallDown();  
      character.updatePosition(this.tile_W,this.tile_H);
      //this.checkTargetTile(character);
    }
  }

  setSprite(character,value){
    if (character.isTrapped){
      let trappedIndex = this.XYToIndex(character.currentPosition[0],character.currentPosition[1],this.map_W);
      for (let i = 0;i<this.spriteArray.length;i++){
        let sprite = this.spriteArray[i];
        if (trappedIndex == sprite.index){
          sprite.hasChaserTrapped = value;
          //console.log(sprite.hasChaserTrapped + " " + sprite.index);
        }
      }
    }
  }

  checkBottomCollision(character){
    let sprites = [];
    let characterIndex =  this.XYToIndex(character.currentPosition[0], character.currentPosition[1], this.map_W);
    for (let i = 0; i<this.spriteArray.length; i++){
      let sprite = this.spriteArray[i];
      if (sprite.index == characterIndex - 1 + this.map_W){
        sprites[0] = sprite;
      }
      if (sprite.index == characterIndex + this.map_W){
        sprites[1] = sprite;
      }
      if (sprite.index == characterIndex + 1 + this.map_W){
        sprites[2] = sprite;
      }
    }
    for (let i = 0; i < sprites.length; i++){
      if(sprites[i]){
        if (sprites[i].id == 1 || (sprites[i].id == 2 && !sprites[i].destroyed || sprites[i].hasChaserTrapped) || sprites[i].id == 3){
          if (i == 0){
            //block lies to left bottom
            if((sprites[i].xPosition + this.tile_W > character.x) && (sprites[i].yPosition <= character.y + character.height)){
              return true;
            }
          }
          else if (i == 1){
            //block lies to just bottom
            //console.log(sprites[i].index + " " +sprites[i].hasChaserTrapped)
            if (sprites[i].yPosition <= character.y + character.height){
              return true;
            }
          }
          else if (i == 2){
            //block lies to bottom right
            if((sprites[i].xPosition < character.x + character.width) && (sprites[i].yPosition <= character.y + character.height)){
              return true;
            }
          }
        }
      }
    }
  }

  destroyCharacterinSprite(character){
    if (character.isIn == 2){
      let characterIndex = this.XYToIndex(character.currentPosition[0],character.currentPosition[1],this.map_W);
      for(let i = 0; i<this.spriteArray.length; i++){
        let sprite = this.spriteArray[i];
        if(sprite.index == characterIndex && !sprite.destroyed){
          if (character.id == 11){
            this.gameState = "gameOver"
          }
          else if (character.id == 22){
              this.chaserArray.splice(this.chaserArray.indexOf(character),1);              
          }
        }
      }
    }
  }

  pickUpSand(runner){
    this.sandArray.forEach((sand)=>{
      if (runner.x + runner.width >= sand.xPosition && runner.x <= sand.xPosition + sand.width  && runner.y + runner.height >= sand.yPosition && runner.y <= sand.yPosition + sand.height){
        console.log("picked")
        this.sandArray.splice(this.sandArray.indexOf(sand),1);
      }    
    })
    if (this.sandArray.length == 0){
      for (let i = 0; i < this.spriteArray.length; i++){
        let sprite = this.spriteArray[i];
        if (sprite.id == 3 && !sprite.activated){
          sprite.activated = true;
        }
      }
      message.innerHTML = "Move up the final ladder to clear level";
    }
  }

  startGame(){
    let animationId = window.requestAnimationFrame(() => this.startGame());
    let climbCounter = 0;
    if (this.gameState == "start_menu"){
      this.drawMenu(menuMap);
      if (keyStateEnter){
        this.gameInit(level1Map,8,38,[192,325,33],[35,114,308,325,378]);
        this.gameState = "ingame";
      }
    }

    else if (this.gameState == "ingame"){
      this.drawWorld();
      this.findCharacter(this.runner);
      //console.log(this.chaserArray.length)
      if (this.chaserArray.length < 3){
        this.newChaser = new Chaser(this.tile_W - 4,this.tile_H - 2, 12,1);
        this.newChaser.x = this.newChaser.currentPosition[0] * this.tile_W;
        this.newChaser.y = this.newChaser.currentPosition[1] * this.tile_H;
        this.chaserArray.push(this.newChaser);        
      }
      this.chaserArray.forEach((chaser)=>{
        this.findCharacter(chaser);
        if (chaser.isTrapped){
          chaser.trappedCounter += 1;
          this.setSprite(chaser,true);
          if (chaser.trappedCounter >= 240){
            this.setSprite(chaser,false);
            chaser.climbUp(this.runner.x,this.tile_W,this.tile_H);
          }
        }
        this.checkGravity(chaser);     
        if (this.checkBottomCollision(chaser)){
          chaser.isFalling = false;
        }
        else{
          chaser.isFalling = true;
        }
        chaser.findRunner(this.runner,this.spriteArray,this.map_W,this.map_H,this.tile_W,this.tile_H);
        this.destroyCharacterinSprite(chaser);
      })

      this.checkGravity(this.runner);
      if(this.checkBottomCollision(this.runner)){
        this.runner.isFalling = false;
      }
      else{
        this.runner.isFalling = true;
      };
      if(this.runner.checkCollision(this.chaserArray)){
        this.gameState = "gameOver"
      };
      this.pickUpSand(this.runner);
      if (this.runner.y + this.runner.height <= 0){
        this.gameState = "clearedLevel";
      }
      this.destroyCharacterinSprite(this.runner);
      //console.log(this.runner.x)
      //console.log(this.findCharacter(this.runner));
  }
  else if (this.gameState == "gameOver"){
    ctx.fillStyle = "black"
    ctx.fillRect(this.runner.x,this.runner.y,this.runner.width,this.runner.height);
    this.sign = 1;
    keyState = [false,false,false,false];
    keyStateZX = [false,false];
    this.runner.draw(4,2);
    this.runner.animationCounter += 0.25;

    message.innerHTML ="GameOver!!! Press Enter to restart";
    if (keyStateEnter){
      this.endGame();
      this.gameInit(level1Map,8,38,[192,325,33],[35,114,308,325,378]);
      this.gameState = "ingame";
    }
  }
  else if (this.gameState == "clearedLevel"){

    message.innerHTML = "Congratulations!!! You cleared this level. Press Enter";
    if (keyStateEnter){
      this.endGame();
      this.gameInit(level2Map,21,51,[98,226,290],[63,153,46,107,238,384]);
      this.gameState = "ingame";
    }

    
  }
      //key movements -----------------------------------------------------------------------------------------------
      if (keyState[0] && this.gameState == "ingame"){
        if (this.checkTargetTile(this.runner)){
          keyState[0] = false;
          this.runner.canMoveLeft = false;
          this.runner.x = Math.floor((this.runner.x - this.runner.dx)/this.tile_W) * this.tile_W;
        }
        else{
          this.runner.canMoveLeft = true;
          this.runner.moveLeft();
          this.runner.updatePosition(this.tile_W,this.tile_H);
        }
      }
      else if (keyState[1] && this.gameState == "ingame"){
        if (this.checkTargetTile(this.runner) || this.runner.isIn == 0){
          //console.log(this.checkTargetTile(this.runner))
          keyState[1] = false;
          this.runner.canMoveUp = false;
          this.runner.y = Math.floor((this.runner.y - this.runner.dy)/this.tile_H) * this.tile_H;
        }
        else{
          this.runner.canMoveUp = true;
          this.runner.moveUp();
          this.runner.updatePosition(this.tile_W, this.tile_H);
        }
      }
      else if (keyState[2] && this.gameState == "ingame"){
        if (this.checkTargetTile(this.runner)){
          keyState[2] = false;
          this.canMoveRight = false;
          this.runner.x = Math.floor((this.runner.x + this.runner.dx)/this.tile_W) * this.tile_W;
        }
        else{
          this.runner.canMoveRight = true;
          this.runner.moveRight();
          this.runner.updatePosition(this.tile_W, this.tile_H);
        }
      }
      else if (keyState[3] && this.gameState == "ingame"){
        if (this.checkTargetTile(this.runner)){
          keyState[3] = false;
          this.runner.canMoveDown = false;
          this.runner.y = Math.floor((this.runner.y + this.runner.dy)/this.tile_H) * this.tile_H + this.runner.dy;
        }
        else{
          this.runner.canMoveDown = true;
          this.runner.moveDown();
          this.runner.updatePosition(this.tile_W, this.tile_H);
        }
      }
      else if (this.gameState == "ingame"){
        this.runner.dontMove();
        this.runner.updatePosition(this.tile_W, this.tile_H);
      }
      if (keyStateZX[0] && this.gameState == "ingame"){
        this.runner.sign = 0;
        this.runner.draw(0,2);
        let runnerIndex = this.XYToIndex(this.runner.currentPosition[0],this.runner.currentPosition[1],this.map_W);
        for (let i = 0; i < this.spriteArray.length;i++){
          let spriteToDestroy = this.spriteArray[i];
          if (spriteToDestroy.index == runnerIndex - 1 + this.map_W && !spriteToDestroy.destroyed){
            spriteToDestroy.destroy();
            break;
          }
        }
      }
      else if (keyStateZX[1] && this.gameState == "ingame"){
        this.runner.sign = 0;
        this.runner.draw(15,2);
        this.runner.canMoveRight = false;
        let runnerIndex = this.XYToIndex(this.runner.currentPosition[0],this.runner.currentPosition[1],this.map_W);
        for (let i = 0; i < this.spriteArray.length;i++){
          let spriteToDestroy = this.spriteArray[i];
          if (spriteToDestroy.index == runnerIndex + 1 + this.map_W){
            spriteToDestroy.destroy();
            break;
          }
        }
        this.runner.canMoveRight = true;
      }
    }
}  

 


level1Map = [1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,3,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,3,0,0,0,0,2,2,3,0,0,0,2,2,2,2,2,2,2,3,2,2,1,
             1,0,0,0,0,0,0,0,3,0,0,0,0,2,2,3,0,0,0,0,0,0,0,0,0,0,3,0,0,1,
             1,2,2,3,2,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,1,
             1,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,
             1,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,0,0,0,0,3,4,4,4,4,4,4,4,4,4,4,3,0,0,0,0,0,0,0,1,
             1,0,0,0,0,3,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,3,1,
             1,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
             1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
            ]
level2Map = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,
             1,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,
             1,3,0,0,0,0,0,0,0,0,3,2,2,2,2,2,2,2,2,2,2,3,0,0,0,0,0,0,0,1,
             1,2,2,2,2,2,3,0,0,0,3,0,0,0,0,0,0,0,0,0,0,3,2,2,2,2,2,2,2,1,
             1,0,0,0,0,0,3,2,2,2,2,2,2,3,2,2,2,2,2,3,2,2,0,0,0,0,0,0,0,1,
             1,0,0,0,0,0,3,0,0,0,0,0,0,3,0,0,0,0,0,3,0,0,4,4,0,0,0,0,0,1,
             1,2,2,2,2,3,2,0,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,4,4,0,0,0,1,
             1,0,0,0,0,3,0,0,0,0,3,2,2,2,2,2,2,3,2,2,0,0,0,0,0,0,4,4,0,1,
             1,0,0,0,0,3,4,4,4,4,3,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,2,1,
             1,0,0,0,0,3,0,0,0,0,0,0,0,0,3,2,2,2,2,2,2,2,3,0,0,0,0,0,0,1,
             1,2,2,2,3,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,2,2,2,2,2,3,2,1,
             1,2,2,2,3,2,2,2,2,2,2,2,2,2,2,0,3,2,2,2,3,0,2,2,2,2,2,3,2,1,
             1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,3,2,2,2,3,0,0,0,0,0,0,3,0,1,
             1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,
             1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
            ]

menuMap = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
           1,0,2,0,0,0,2,2,2,0,2,2,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,2,0,0,0,2,0,2,0,2,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,2,0,0,0,2,0,2,0,2,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,2,2,2,0,2,2,2,0,2,2,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,2,2,2,0,2,0,2,0,2,0,0,2,0,2,0,0,2,0,2,2,2,0,2,2,2,0,0,1,
           1,0,2,0,2,0,2,0,2,0,2,2,0,2,0,2,2,0,2,0,2,2,0,0,2,0,2,0,0,1,
           1,0,2,2,0,0,2,0,2,0,2,0,2,2,0,2,0,2,2,0,2,0,0,0,2,2,0,0,0,1,
           1,0,2,0,2,0,2,2,2,0,2,0,0,2,0,2,0,0,2,0,2,2,2,0,2,0,2,0,0,1,
           1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
           1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
          ]

gameWorld = new GameWorld(30,15);
gameWorld.startGame();
let message = document.getElementById("message_div");
