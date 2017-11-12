var mainWrapper = document.getElementById("main-wrapper");
var imageDiv = document.createElement("div");
var imageUl= document.createElement("ul");
var imageLiFirst = document.createElement("li");
var imageLiSecond = document.createElement("li");
var prevButton = document.createElement("button");
var nextButton = document.createElement("button");
var imageSrcArray = ["images/image1.jpg","images/image2.jpg","images/image3.jpg","images/image4.jpg","images/image5.jpg"];

var currentImageIndex=0;
var nextImageIndex=0;
var prevImageIndex=0;
var flag = 0;

var firstItem = document.createElement("img");
var secondItem = document.createElement("img");

imageDiv.style.height="400px";
imageDiv.style.width="400px";
imageDiv.style.overflow="hidden";
imageDiv.style.position="relative";
displayedImage = document.createElement("img");
displayedImage.src = imageSrcArray[currentImageIndex];
imageDiv.appendChild(displayedImage);
mainWrapper.appendChild(imageDiv);

prevButton.innerHTML="Previous";
nextButton.innerHTML="Next";
mainWrapper.appendChild(prevButton);
mainWrapper.appendChild(nextButton);

prevButton.onclick = function(){
	if (flag == 0){
		flag = 1;
		imageLoader("prev");
		imageUlCreator("prev");
		animate(-400,0);
		currentImageIndex = prevImageIndex;
	}
}

nextButton.onclick = function(){
	if (flag == 0){
		flag = 1;
		imageLoader("next");
		imageUlCreator("next");
		animate(0,-400);
		currentImageIndex = nextImageIndex;

	}
}

function imageLoader(calledBy){
	switch(calledBy){
		case "prev":
			prevImageIndex = (currentImageIndex + 4) % 5;
			nextImageIndex = (currentImageIndex + 1) % 5;
			firstItem.src=imageSrcArray[prevImageIndex];
			secondItem.src = imageSrcArray[currentImageIndex];
		break;
		case "next":
			prevImageIndex = (currentImageIndex + 4) % 5;
			nextImageIndex = (currentImageIndex + 1) % 5;
			firstItem.src=imageSrcArray[currentImageIndex];
			secondItem.src = imageSrcArray[nextImageIndex];
		break;

	}

}

function imageUlCreator(calledBy){
	switch(calledBy){
		case "prev":
			imageUl.style.position = "absolute";
			imageUl.style.width = "800px";
			imageUl.style.top = "0px";
			imageUl.style.margin = "0px";
			imageUl.style.marginLeft = "-400px";
			imageUl.style.padding = "0px";
		break;
		case "next":
			imageUl.style.position = "absolute";
			imageUl.style.width = "800px";
			imageUl.style.top = "0px";
			imageUl.style.margin = "0px";
			imageUl.style.marginLeft = "0px";
			imageUl.style.padding = "0px";
		break;
	}

	imageLiFirst.style.width = "400px";
	imageLiFirst.style.display = "inline-block";
	imageLiFirst.appendChild(firstItem);
	imageUl.appendChild(imageLiFirst);


	imageLiSecond.style.width = "400px";
	imageLiSecond.style.display = "inline-block";
	imageLiSecond.appendChild(secondItem);
	imageUl.appendChild(imageLiSecond);
	imageDiv.appendChild(imageUl);

}

var animate = function(start,end){
	var signValue;
	signValue = (end-start)/400;
	var offset = 0;
	var stop = setInterval(function(){
		offset = 5;
		start = start + signValue * offset;
		imageUl.style.marginLeft = start + "px";
		if (parseInt(imageUl.style.marginLeft) == end){
			clearInterval(stop);
			displayedImage.src = imageSrcArray[currentImageIndex];
			imageUl.removeChild(imageLiFirst);
			imageUl.removeChild(imageLiSecond);
			imageDiv.removeChild(imageUl);
			flag = 0;

		}
	},10)
}




