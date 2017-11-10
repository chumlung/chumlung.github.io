var gameScreen = document.getElementById("main-wrapper");
gameScreen.style.width="470px";
gameScreen.style.height="680px";
gameScreen.style.backgroundImage ="url('road.png')";
gameScreen.style.backgroundRepeat = "repeat-y";
gameScreen.style.overflow="hidden";
var x=0;

function Car(){

	this.bottom=20;
	this.left=200;

	this.element = document.createElement("div");
	this.element.style.backgroundImage="url('car.png')";
	this.element.style.width = "58px";
	this.element.style.height = "160px";
	this.element.style.position = "absolute";
	this.element.style.bottom = this.bottom+"px";
	this.element.style.left = this.left+"px";
	gameScreen.appendChild(this.element);

	this.moveRight = function(){
		if (this.left<325){
			this.left = this.left+125;
			this.element.style.left = this.left+"px"; 
		}
	}

	this.moveLeft = function(){
		if(this.left>75){
			this.left = this.left -125;
			this.element.style.left = this.left+"px";
		}

	}



}
var car = new Car();

setInterval(function(){
	gameScreen.style.backgroundPosition = "center top "+x+"px";
	x=x+2;
	document.onkeydown=function(event){
	var code = event.keyCode;
	console.log(code);
		switch(code){
			case 39:
				car.moveRight();
			break;
			case 37:
				car.moveLeft();
			break;

		}
}

},10);
