var MainWrapper = document.getElementById("main-wrapper");
var canvas = document.getElementById("canvas");
MainWrapper.appendChild(canvas);
canvas.style.border = "#000 1px solid"
ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.arc(50,50,50,0,Math.PI*2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();