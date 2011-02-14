var g = new GlitchText();
var souceArea;
var glitchButton;
var resultArea;
var copyButton;
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
window.addEventListener('load',function(){
	souceArea = document.getElementById('sourceArea');
	glitchButton = document.getElementById('glitchButton');
	resultArea = document.getElementById('resultArea');
	copyButton = document.getElementById('copyButton');
	glitchButton.textContent = glitch("glitch").slice(0,40);
	copyButton.textContent = glitch("copy").slice(0,40);

	//document.getElementById('glitchButton').addEventListener('click',function(){
	glitchButton.addEventListener('click',function(){
		resultArea.value = glitch(sourceArea.value);
	},true);
	copyButton.addEventListener('click',function(){
		resultArea.select();
		resultArea.focus();
		document.execCommand("copy");
	},true);
})

