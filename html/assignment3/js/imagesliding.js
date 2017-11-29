const IMAGE_WIDTH = 1170;
var titleImageJson = {
  0:{
    title : "Donec faucibus ultricies congue",
    imagesArray : ["images/body-image1.jpg","images/body-image2.jpg","images/body-image3.jpg"]
  },
  1:{
    title : "Dultricies congue",
    imagesArray : ["images/beach1.jpg","images/beach2.jpg","images/beach3.jpg","images/beach4.jpg"]
  },
  2:{
    title : "Faucibus ultricies",
    imagesArray : ["images/lake1.jpg","images/lake2.jpg","images/lake3.jpg"]
  }
};

var jsonLength = Object.keys(titleImageJson).length;

var titleDiv = document.getElementById("title-heading");
var imageUlDiv = document.getElementById("body-main-image");
var currentUlDiv = document.getElementById("current-indicator");
var sliderLeft = document.getElementById("body-image-left");
var sliderRight = document.getElementById("body-image-right");
var currentArray = [];
var imageLiArray = [];


var value = 0;


var titleLeft = document.getElementById("title-left");
titleLeft.onclick = function(){
  if (value > 0){
    removeCurrent();
    value--;
    setTitleandImage();
  }
}
var titleRight = document.getElementById("title-right");
titleRight.onclick = function(){
  if (value < jsonLength-1){
    removeCurrent();
    value++;
    setTitleandImage();
  }
}

var removeCurrent = function(){
  for(var i = 0;i < titleImageJson[value]["imagesArray"].length;i++){
    imageUlDiv.removeChild(imageLiArray[i]);
    currentUlDiv.removeChild(currentArray[i]);
  }
  imageLiArray.splice(0,titleImageJson[value]["imagesArray"].length);
  currentArray.splice(0,titleImageJson[value]["imagesArray"].length);
}

var setTitleandImage = function(){
  var flag = 0;
  var current = 0;
  var imageIndex = 0;


  imageUlDiv.style.width = (IMAGE_WIDTH * titleImageJson[value]["imagesArray"].length) + "px";
  titleDiv.innerHTML = titleImageJson[value]["title"];
  for(var i = 0;i < titleImageJson[value]["imagesArray"].length;i++){
    var imageLi = document.createElement("li");
    imageLiArray.push(imageLi);
    var displayImage = document.createElement("img");
    displayImage.src = titleImageJson[value]["imagesArray"][i];
    imageLi.appendChild(displayImage);
    imageUlDiv.appendChild(imageLi);
    var currentLi = document.createElement("li");
    currentUlDiv.appendChild(currentLi);
    currentArray.push(currentLi);
  } 
  currentArray[0].setAttribute("class","current");
  sliderRight.onclick = function(){
  if (flag == 0 && imageIndex< titleImageJson[value]["imagesArray"].length-1){
    flag = 1;
    animate(current*IMAGE_WIDTH,(current-1)*IMAGE_WIDTH);
    current --;
    imageIndex ++;
    setCurrentState(-1);
    }
  }

  sliderLeft.onclick = function(){
  if (flag == 0 && imageIndex>0){
      flag = 1;
      animate(current*IMAGE_WIDTH,(current+1)*IMAGE_WIDTH);
      current ++;
      imageIndex --;
      setCurrentState(1);
    }
  }

var setCurrentState = function(value){
  currentArray[imageIndex].setAttribute("class","current");
  currentArray[imageIndex + value].setAttribute("class","notCurrent")
}
var animate = function(start,end){
  var signValue;
  signValue = (end-start)/IMAGE_WIDTH;
  var offset = 0;
  var stop = setInterval(function(){
    offset = 3;
    start = start + signValue * offset;
    imageUlDiv.style.marginLeft = start + "px";
    if (parseInt(imageUlDiv.style.marginLeft) == end){
      clearInterval(stop);
      flag = 0;
    }
  },1)
}
}
setTitleandImage();






