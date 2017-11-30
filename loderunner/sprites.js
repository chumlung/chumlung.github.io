class Sprite{
  constructor(id,imageName,isDestroyed,allowsMovement,isactive,xPosition,yPosition,width,height,index){
    this.id = id;
    this.index = index;
    this.image = null;
    this.width = width;
    this.height = height;
    this.destroyed = isDestroyed;
    this.hasChaserTrapped = false;
    this.allowsMovement = allowsMovement;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.activated = isactive;

    if (imageName != undefined && imageName!= "" && imageName!= null){
      this.image = new Image();
      this.image.src =  imageName;

    }
    else{
      console.log("not loaded");
    }
  }
  draw(x,y,w,h){
      ctx.drawImage(this.image,x,y,w,h);
  }
  destroy(){
    if (this.id == 2 && !this.destroyed){
      this.destroyed = true;        
    }
    setTimeout(()=>{
      this.rebuild();
    },2000)
  }
  rebuild(){
    this.destroyed = false;
  }

}