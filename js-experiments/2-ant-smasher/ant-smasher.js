var MainWrapper = document.getElementById("main-wrapper");
MainWrapper.style.height="500px";
MainWrapper.style.width="500px";
MainWrapper.style.margin="0px";
MainWrapper.style.padding="0px";
MainWrapper.style.backgroundColor="pink";

var totalAnts=0;
var antArray = [];



function Ant(objectId){
	this.id = objectId;
	totalAnts = totalAnts+1;
	this.element = document.createElement("div");
	this.element.style.height="20px";
	this.element.style.width="20px";
	this.element.style.backgroundImage="url('ant.png')";
	this.element.style.position="absolute";


	MainWrapper.appendChild(this.element);
	this.x=Math.random()*400;
	this.y=Math.random()*400;
	this.dx=Math.random()*5;
	this.dy=Math.random()*5;
	parentWidth = parseInt(this.element.parentElement.style.width);
	parentHeight = parseInt(this.element.parentElement.style.height);

	this.updatePosition = function(){
		this.checkBoundary();
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;
		this.element.style.top = this.y+"px";
		this.element.style.left = this.x+"px";
	}

	this.checkBoundary = function(){
		if ((this.x>parentWidth-20) || (this.x<0))
			this.dx=-this.dx;
		if ((this.y>parentHeight-20) || (this.y<0))
			this.dy=-this.dy;
	}





}
for(i=0;i<10;i++){
	var ant = new Ant(i);
	antArray.push(ant);
	ant.element.onclick = function(){
		var clickedAnt;
		for(var i=0;i<antArray.length;i++){
			if(antArray[i].element == this){
				clickedAnt = antArray[i];
			}
		};
		that =  this;
		this.style.backgroundImage = "url('splat.png')";
		clickedAnt.dx = 0;
		clickedAnt.dy = 0;
		setTimeout(function(){
			console.log(clickedAnt);
			MainWrapper.removeChild(that);
			antArray.splice(antArray.indexOf(clickedAnt),1);
			if(antArray.length == 0){
			console.log("game over");
			clearInterval(runningGame);
		}
		},100)
	}
}


var collisionDetect = function(first,second){
	if ((first.x+20>second.x) && (first.x<second.x+20) && (first.y+20>second.y) && (first.y<second.y+20)){
		if(first.x>second.x){
			first.dx=Math.abs(first.dx);
			second.dx=-Math.abs(second.dx);
			if(first.y>second.y){
				first.dy=Math.abs(first.dy);
				second.dy=-Math.abs(second.dy);
			}else{
				second.dy=Math.abs(second.dy);
				first.dy=-Math.abs(first.dy);
			}
			}else{
				second.dx=Math.abs(second.dx);
				first.dx=-Math.abs(first.dx);
				if(first.y>second.y){
					first.dy=Math.abs(first.dy);
					second.dy=-Math.abs(second.dy);
				}else{
					second.dy=Math.abs(second.dy);
					first.dy=-Math.abs(first.dy);
				}
	}
		
				
	}
}


var runningGame = setInterval(function(){
	for(var i = 0; i<antArray.length-1; i++){
		for (var j = i+1; j<antArray.length; j++){
			collisionDetect(antArray[i],antArray[j]);
		}
	}
	antArray.forEach(function(ant){
	ant.updatePosition();

})
},30);