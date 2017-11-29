var imagesSrcArray = ["images/block-image.jpg","images/block-image2.jpg","images/block-image3.jpg","images/block-image4.png",
"images/block-image5.png","images/block-image6.jpg","images/block-image7.jpg","images/block-image8.jpg"];
var block = [];
var imagesLiArray = [];
var value = 0;
var flag = 0;
var current = 0;
block[0] = document.getElementById("bottom-block1");
block[1] = document.getElementById("bottom-block2");
block[2] = document.getElementById("bottom-block3");
block[3] = document.getElementById("bottom-block4");

var leftSlider = document.getElementById("bottom-left-slider");
var rightSlider = document.getElementById("bottom-right-slider");

for(var i=0;i<4;i++){
	var displayImage = document.createElement("img");
	displayImage.src = imagesSrcArray[i];
	imagesLiArray.push(displayImage);
	block[i].appendChild(displayImage);
}

var removeImages = function(){
	for (var i=0;i<4;i++){
		block[i].removeChild(imagesLiArray[i]);
	}
	imagesLiArray.splice(0,4);
}

leftSlider.onclick = function(){
  if (flag == 0 && current == 1){
    flag = 1;
    removeImages();
    fadeAnimate(0);
    current--;
  }
}
rightSlider.onclick = function(){
  if (flag == 0 && current == 0){
    flag = 1;
    removeImages();
    fadeAnimate(4);
    current++;
  }
}

var fadeAnimate = function(imageOffset){
    for (var i = 0;i<4;i++){
      var displayImage = document.createElement("img");
      displayImage.src = imagesSrcArray[i+imageOffset];
      displayImage.style.opacity = 0;
      imagesLiArray.push(displayImage);
      block[i].appendChild(displayImage);
    }
    var stop = setInterval(function(){
    for (var i=0;i<4;i++){
      imagesLiArray[i].style.opacity = value;
    }
    value += 0.1;
		if(value >= 1){
      clearInterval(stop);
      value = 0;
      flag = 0;
		}
	},60)
}