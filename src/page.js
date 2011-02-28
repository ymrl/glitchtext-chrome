function glitchChild(n){
	var c = n.childNodes;
	if(n.tagName.match(/script|style/i)){
		return null;
	}
  for(var i=0;i<c.length;i++){
		var m = c[i];
		if(m.nodeType == 1){
			glitchChild(m);
		}else if(m.nodeType==3 && !m.textContent.match(/^[\s　]*$/)){
			chrome.extension.sendRequest(
				{command:'glitch',source:m.textContent},
				function(res){
					m.textContent = res.result.slice(0,m.textContent.length*10);
				}
			);
			//m.textContent = m.textContent.split('').reverse().join('');
		}
	}
}

function addButton(){
	var pageButton = document.createElement('div');
	pageButton.textContent = 'glitch';
	pageButton.style.width = '60px';
	pageButton.style.border=0;
	pageButton.style['border-radius'] = '4px';
	pageButton.style['text-align'] = 'center';
	pageButton.style.height = '18px';
	pageButton.style.margin = 0;
	pageButton.style.padding = 0;
	pageButton.style.backgroundColor = '#ccc';
	pageButton.style.color = '#000';
	pageButton.style.font = '12px sans-serif';
	pageButton.style.position = 'fixed';
	pageButton.style.right = '0';
	pageButton.style.bottom = '0';
	pageButton.style['z-index'] = 999999999;
	pageButton.addEventListener("click",function(e){glitchChild(document.body)});
	document.body.appendChild(pageButton)
}

chrome.extension.sendRequest(
		{command:'alwaysAllContentEnable'},
		function(res){
			console.log(res);
			if(res.enable){
				glitchChild(document.body);
			}else{
				chrome.extension.sendRequest(
					{command:'allContentEnable',url:document.location.href},
					function(res){
						if(res.enable){
							window.addEventListener("load",addButton);
						}
					}
				);
			}
		});
