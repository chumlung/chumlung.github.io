var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.height="500px";
mainWrapper.style.width="500px";
mainWrapper.style.margin="0px";
mainWrapper.style.padding="0px";




function Box(elementId){
	this.element = document.getElementById(elementId);
	this.x=Math.random()*500;
	this.y=Math.random()*500;
	this.dx=2;
	this.dy=2;
	var that=this;

	this.updatePosition = function(){
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
		this.element.style.top = this.y +"px";
		this.element.style.left = this.x+"px";

		if (this.x>=480){
			this.dx=-2;
		}
		if (this.y>=480){
			this.dy=-2
		}
		if (this.x<=0){
			this.dx=2
		}
		if (this.y<=0){
			this.dy=2
		}
	}
	setInterval(function(){
		that.updatePosition();

	},40);

}

for(i=0;i<10;i++){
	var child = document.createElement("div");
	child.className="child";
	mainWrapper.appendChild(child);
	child.setAttribute("id","child"+i);
	var box = new Box("child"+i);
	child.style.top = box.y+"px";
	child.style.left = box.x+"px";
	child.onclick = function(){
		this.style.backgroundImage="url('splat.png')";
		that =this;
		setTimeout(	function(){	
			mainWrapper.removeChild(that);
			},100)

	}
}
