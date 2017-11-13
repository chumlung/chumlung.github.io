
var data = [
{
  tagName:"div",
  className:"test-class",
  styles:{
    width : "100px",
    height: "100px",
    backgroundColor:"red"
  },
  children :[
  {
    tagName: "div",
    className: "box",
    styles:{
      width:"50px",
      height:"50px",
      backgroundColor:"blue"
    },
  },
  {
    tagName: "div",
    className: "box",
    styles:{
      width:"50px",
      height:"50px",
      backgroundColor:"brown",
      float:"right"
    }
  }
  ]
}
];


var MainWrapper = document.getElementsByTagName('body')[0];
var jsonParser = function(parentElement,jsonObject){
  var childElement =  buildElement(jsonObject);
  var flag = hasChildren(jsonObject);
  if (flag == 1){
    for (j = 0; j < jsonObject.children.length; j++){
      jsonParser(childElement,jsonObject.children[j])
    }
  }
  parentElement.appendChild(childElement);
}
var buildElement = function(jsonObject){
  var newElement = document.createElement(jsonObject.tagName);
  newElement.setAttribute("class",jsonObject.className);
  for (styleKey in jsonObject.styles){
    newElement.style[styleKey] = jsonObject.styles[styleKey];
  }
  return newElement;
}
var hasChildren = function(jsonObject){
  var jsonKeys =  Object.keys(jsonObject);
  var flag = 0;
  jsonKeys.forEach(function(key){
    if (key == "children"){
      flag = 1;
    }
  });
  return flag;
}

for (i = 0;i < data.length; i++){
  jsonParser(MainWrapper,data[i]);
}
