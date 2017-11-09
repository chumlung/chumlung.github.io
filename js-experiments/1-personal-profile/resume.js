<<<<<<< HEAD
var mainWrapper = document.getElementById("main-wrapper");
var jsonObject ={
	fullName:{
		fName: "Chumlung",
		lName: "Limbu"
	},
	age:{age:"13"},
	address:{residence:"Satdobato Lalitpur"},
	contactno:{mobile:"9877454112"},
	education:{
		SLC:"ABC School",
		HSEB:"XYZ College",
		Bachelors:"Kathmandu Engineering College"
	},
	skills:{
		software:"Java",
		personal:"Friendly"
	},
	hobbies:{sports:"football"},
}


var jsonKeys = Object.keys(jsonObject);

for(var i=0;i<jsonKeys.length;i++){
	var key = jsonKeys[i];
	console.log(key);
	var newDiv = document.createElement("div");
	mainWrapper.appendChild(newDiv);
	newDiv.innerHTML = [key];
	var jsonNestedKeys = Object.keys(jsonObject[key]);
	console.log(jsonNestedKeys.length);
	for (var j=0;j<jsonNestedKeys.length;j++){
		var NestedKey= jsonNestedKeys[j];
		var innerDiv = document.createElement("div");
		newDiv.appendChild(innerDiv);
		innerDiv.innerHTML = jsonNestedKeys[j]+": "+jsonObject[key][NestedKey];
		console.log(jsonObject[key][NestedKey]);
	}


}




=======
var mainWrapper = document.getElementById("main-wrapper");
var jsonObject ={
	fullName:{
		fName: "Chumlung",
		lName: "Limbu"
	},
	age:{age:"13"},
	address:{residence:"Satdobato Lalitpur"},
	contactno:{mobile:"9877454112"},
	education:{
		SLC:"ABC School",
		HSEB:"XYZ College",
		Bachelors:"Kathmandu Engineering College"
	},
	skills:{
		software:"Java",
		personal:"Friendly"
	},
	hobbies:{sports:"football"},
}


var jsonKeys = Object.keys(jsonObject);

for(var i=0;i<jsonKeys.length;i++){
	var key = jsonKeys[i];
	console.log(key);
	var newDiv = document.createElement("div");
	mainWrapper.appendChild(newDiv);
	newDiv.innerHTML = [key];
	var jsonNestedKeys = Object.keys(jsonObject[key]);
	console.log(jsonNestedKeys.length);
	for (var j=0;j<jsonNestedKeys.length;j++){
		var NestedKey= jsonNestedKeys[j];
		var innerDiv = document.createElement("div");
		newDiv.appendChild(innerDiv);
		innerDiv.innerHTML = jsonNestedKeys[j]+": "+jsonObject[key][NestedKey];
		console.log(jsonObject[key][NestedKey]);
	}


}




>>>>>>> f25c25d3fea33f51c5ca5880e00cbd5d9b166da3
