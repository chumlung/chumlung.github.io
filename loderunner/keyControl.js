var keyState = [false,false,false,false]
var keyStateZX = [false,false]
var keyStateEnter = false;
var flag = 0;
var flagZX = 0;
document.onkeydown = function(event){
	var code = event.keyCode;
  if (flag == 0){
	switch(code){
   case 37:
    keyState[0] = true;
    flag = 1;
   break;
   case 38:
    keyState[1] = true;
    flag = 1;
   break;
   case 39:
    keyState[2] = true;
    flag = 1;
   break;
   case 40:
    keyState[3] = true;
    flag = 1;
   break;
   case 90:
    keyStateZX[0] = true;
    flagZX = 1;
   break;
   case 88:
    keyStateZX[1] = true;
    flagZX = 1;
   break;
   case 13:
    keyStateEnter = true;
  }
 }
}

document.onkeyup = function(event){
  var code = event.keyCode;
  switch(code){
   case 37:
    keyState[0] = false;
    flag = 0;
   break;
   case 38:
    keyState[1] = false;
    flag = 0;
   break;
   case 39:
    keyState[2] = false;
    flag = 0;
   break;
   case 40:
    keyState[3] = false;
    flag = 0;
   break;
   case 90:
    keyStateZX[0] = false;
    flagZX = 0;
   break;
   case 88:
    keyStateZX[1] = false;
    flagZX = 0;
   break;
   case 13:
   keyStateEnter = false;
   break;
 }  
}