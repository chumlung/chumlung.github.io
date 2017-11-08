var mainWrapper = document.getElementById("main-wrapper");
mainWrapper.style.width="500px";
mainWrapper.style.height = "500px";
mainWrapper.style.backgroundColor = "red";
mainWrapper.style.position="relative";
var listDiv = document.createElement("div");
var parent = mainWrapper.parentElement;
parent.appendChild(listDiv);
var list = document.createElement("ul");
listDiv.appendChild(list);
list.width="110px";




/*var p = [];
p.push({
	top: 0,
	left:0
})*/

for(var i=0;i<10;i++){
	var dot = document.createElement("div");
	mainWrapper.appendChild(dot);
	dot.style.height="10px";
	dot.style.width="10px";
	dot.style.backgroundColor="white";
	dot.style.position="absolute";
	dot.style.top=Math.random()*500+"px";
	dot.style.left=Math.random()*500+"px";
	dot.onclick = function() {
		var top= this.style.getPropertyValue("top");
		var left=this.style.getPropertyValue("left");
		var item=document.createElement("li");
		var value = document.createElement("p");
		value.innerHTML = top+"px"+left+"px";
		item.appendChild(value);
		list.appendChild(item);
		//console.log("top is:"+top);
		//console.log("left is:"+left);
		mainWrapper.removeChild(this);
	}
}





