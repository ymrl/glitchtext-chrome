var g = new GlitchText();
var no_glitch = /(https?\:[\w\.\~\-\/\?\&\+\=\:\@\%\;\#\%]+|[#@][A-Za-z0-9_]+)/;

function glitch(source){
	if(source.length < 1){return "";}
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
function isUrlGlitchAnywhereEnable(u){
	if(localStorage["useGlitchAnywhere"] != "true"){return false;}
	var regs = localStorage["urlNotUseGlitchAnywhere"].split(/\n/);
	for(var i=0;i<regs.length;i++){
		var reg = new RegExp(regs[i]);
		if(u.match(reg)){ return false;}
	}
	return true;
}
	

function requestHandler(req,sdr,snd){
	switch(req.command){
		case 'glitch':
			snd({result:glitch(req.source)});
			break;
		case 'anywhereEnable':
			snd({enable:isUrlGlitchAnywhereEnable(req.url)});
			break;
	}
}

chrome.extension.onRequest.addListener(requestHandler);
