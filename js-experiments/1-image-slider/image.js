var mainWrapper = document.getElementById("main-wrapper")
var imageContainer = document.createElement("ul");
var imageViewer = document.createElement("div");
var image;
var list;
var imageWidth=0;

mainWrapper.appendChild(imageViewer);
var prevBtn = document.createElement("button");
mainWrapper.appendChild(prevBtn);
prevBtn.innerHTML="Previous";
var nextBtn = document.createElement("button");
mainWrapper.appendChild(nextBtn);
nextBtn.innerHTML="Next";
imageViewer.appendChild(imageContainer);
imageViewer.style.height="400px";
imageViewer.style.width="400px";
imageViewer.style.overflow = "hidden";
imageViewer.style.position = "relative";
imageContainer.style.listStyle="none";
imageContainer.style.width="2000px";
imageContainer.style.position="absolute";
imageContainer.style.padding="0px";
imageContainer.style.margin="0px";

for (var i=0;i<5;i++){
	image = document.createElement("img");
	image.src="images/image"+[i+1]+".jpg";
	list = document.createElement("li");
	list.style.display="inline-block";
	list.appendChild(image);
	imageContainer.appendChild(list);
}

nextBtn.onclick=function(){
	imageWidth=imageWidth-1;
	console.log(imageWidth);
	imageContainer.style.left=imageWidth*400+"px";
}
prevBtn.onclick=function(){
	imageWidth=imageWidth+1;
	console.log(imageWidth);
	imageContainer.style.left=imageWidth*400+"px";
}

