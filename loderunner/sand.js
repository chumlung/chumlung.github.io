class Sand{
  constructor(index,mapWidth,tileWidth,tileHeight){
    this.index = index;
    this.x = index % mapWidth;
    this.y = Math.floor(index / mapWidth);
    this.xPosition = this.x * tileWidth;
    this.yPosition = this.y * tileHeight;
    this.width = tileWidth;
    this.height = tileHeight - 9;
    this.image = new Image();
    this.image.src = "sand.png";

  }
  draw(){
    ctx.drawImage(this.image,this.xPosition,this.yPosition + 9,this.width,this.height);
  }
}