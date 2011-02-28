var g = new GlitchText();
var no_glitch = /(https?\:[\w\.\~\-\/\?\&\+\=\:\@\%\;\#\%]+|[#@][A-Za-z0-9_]+)/;
var whitespace = /^[\s　]*$/;

function glitch(source){
	if(source.length < 1){return "";}
	var n = Math.floor(Math.random()*3+1);
	var result = source.split(no_glitch).map(function(s){
		if(s.length < 1) return s;
		if(s.match(no_glitch)) return s;
		if(s.match(whitespace)) return s;
		while(true){
			s = g.random(s);
			if(Math.random() > 0.6) break;
		};
		return s;
	}).join(' ');
  return result;
}

function isUrlGlitchAnywhereEnable(u){
	if(localStorage["useGlitchAnywhere"]=="false"){
		return false;
	}else if(localStorage["useGlitchAnywhere"]==undefined){
		localStorage["useGlitchAnywhere"]="true";
	}
	if(localStorage["urlNotUseGlitchAnywhere"]){
		var regs = localStorage["urlNotUseGlitchAnywhere"].split(/\n/);
		for(var i=0;i<regs.length;i++){
			var reg = new RegExp(regs[i]);
			if(u.match(reg)){ return false;}
		}
	}else{
		localStorage["urlNotUseGlitchAnywhere"]="";
	}
	return true;
}
	
function isUrlGlitchAllContentEnable(u){
	if(localStorage["useGlitchAllContent"]=="false"){
		return false;
	}else if(localStorage["useGlitchAllContent"]==undefined){
		localStorage["useGlitchAllContent"]="true";
	}
	if(localStorage["urlNotUseGlitchAllContent"]){
		var regs = localStorage["urlNotUseGlitchAllContent"].split(/\n/);
		for(var i=0;i<regs.length;i++){
			var reg = new RegExp(regs[i]);
			if(u.match(reg)){ return false;}
		}
	}else{
		localStorage["urlNotUseGlitchAllContent"]="";
	}
	return true;
}

function isEnableAlwaysGlitchAllContent(){
	if(localStorage['alwaysGlitchAllContent']){
		if(localStorage['alwaysGlitchAllContent'] != "false"){
			return true;
		}else{
			return false;
		}
	}else if(localStorage['alwaysGlitchAllContent'] == undefined){
		localStorage['alwaysGlitchAllContent'] = "false";
	}else{
		return false;
	}
}

function requestHandler(req,sdr,snd){
	switch(req.command){
		case 'glitch':
			snd({result:glitch(req.source)});
			break;
		case 'anywhereEnable':
			snd({enable:isUrlGlitchAnywhereEnable(req.url)});
			break;
		case 'allContentEnable':
			snd({enable:isUrlGlitchAllContentEnable(req.url)});
			break;
		case 'alwaysAllContentEnable':
			snd({enable:isEnableAlwaysGlitchAllContent()});
			break;
	}
}

chrome.extension.onRequest.addListener(requestHandler);
