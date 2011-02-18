var g = new GlitchText();
var souceArea;
var glitchButton;
var resultArea;
var copyButton;
var isStrLengthLimitedField;
var strLimitLengthField;
var sourceCounter;
var resultCounter;
var no_glitch = /(https?\:[\w\.\~\-\/\?\&\+\=\:\@\%\;\#\%]+|[#@][A-Za-z0-9_]+)/;

function glitch(source){
	if(source.length < 1){return;}
	var n = Math.floor(Math.random()*3+1);
	var result = source.split(no_glitch).map(function(s){
		if(s.length < 1) return s;
		if(s.match(no_glitch)) return s;
			while(true){
				s = g.random(s);
				if(Math.random() > 0.6) break;
			};
			return s;
	}).join(' ');
  return result;
}
function glitchFromSource(){
	var result = glitch(sourceArea.value);
	if(isStrLengthLimitedField.value == "on"){
		result = result.slice(0,parseInt(strLimitLengthField.value));
	}
	resultArea.value = result;
	resultCounter.textContent = result.length;
}

window.addEventListener('load',function(){
	souceArea = document.getElementById('sourceArea');
	glitchButton = document.getElementById('glitchButton');
	resultArea = document.getElementById('resultArea');
	copyButton = document.getElementById('copyButton');
	isStrLengthLimitedField = document.getElementById('isStrLengthLimited');
	strLimitLengthField = document.getElementById('strLimitLength');
	resultCounter = document.getElementById('resultCounter');
	sourceCounter = document.getElementById('sourceCounter');
	glitchButton.textContent = glitch("glitch").slice(0,40);
	copyButton.textContent = glitch("copy").slice(0,40);

	sourceArea.addEventListener('keyup',function(){
		sourceCounter.textContent = sourceArea.value.length;
		glitchFromSource();
	})
	resultArea.addEventListener('keyup',function(){
		resultCounter.textContent = resultArea.value.length;
	})

	if(localStorage["defaultLimitLength"]){
		strLimitLengthField.value = localStorage["defaultLimitLength"];
	}else if(localStorage["defaultLimitLength"] == undefined){ 
		localStorage["defaultLimitLength"] = strLimitLengthField.value;
	}

	if(localStorage["alwaysLimit"] == "true"){
		isStrLengthLimitedField.checked = true;
	}else if(localStorage["alwaysLimit"] == undefined){
		isStrLengthLimitedField.checked = true;
		localStorage["alwaysLimit"] = "true";
	}else{
		isStrLengthLimitedField.checked = false;
	}

	glitchButton.addEventListener('click',glitchFromSource,true);

	copyButton.addEventListener('click',function(){
		resultArea.select();
		resultArea.focus();
		document.execCommand("copy");
	},true);
})

