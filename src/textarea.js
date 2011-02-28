var glitchButtonAdded = [];

function addButton(a){
	if(glitchButtonAdded.indexOf(a)>=0){ return; }
	if(a.clientHeight ==0){ return; }

	glitchButtonAdded.push(a);
	var b = document.createElement('button');
	b.textContent = 'glitch';

	b.style.width = '60px';
	b.style.border=0;
	b.style['border-radius'] = '4px';
	b.style['text-align'] = 'center';
	b.style.height = '18px';
	b.style.margin = 0;
	b.style.padding = 0;
	b.style.backgroundColor = '#ccc';
	b.style.color = '#000';
	b.style.font = '12px sans-serif';

	var c = document.createElement('button');
	c.textContent = 'original';
	c.style.width = '60px';
	c.style.border=0;
	c.style['border-radius'] = '4px';
	c.style['text-align'] = 'center';
	c.style.height = '18px';
	c.style.margin = 0;
	c.style.padding = 0;
	c.style.backgroundColor = '#ccc';
	c.style.color = '#000';
	c.style.font = '12px sans-serif';

	var d = document.createElement('div');

	d.style.cursor = 'default';
	d.style.width = '164px';
	d.style.height = '22px';
	d.style.position = 'relative';

	d.appendChild(b);
	d.appendChild(c);

	a.parentNode.insertBefore(d,a);

	var original = '';
	var changed = false;
	a.addEventListener("keyup",function(e){
			changed = true;
			original = a.value;
	},true);

	b.addEventListener("click",function(e){
		if(!changed){
			changed = true;
			original = a.value;
		}
		chrome.extension.sendRequest(
			{command:'glitch',source:original},
			function(res){
				a.value = res.result;
			}
		);
		e.preventDefault();
	},true);

	c.addEventListener("click",function(e){
		a.value = original;
		e.preventDefault();
	});
}

function glitchChild(n){
	var c = n.childNodes;
	if(n.tagName.match(/script|style/i)){
		return null;
	}
  for(var i=0;i<c.length;i++){
		var m = c[i];
		if(m.tagName){
			glitchChild(m);
		}else{
			chrome.extension.sendRequest(
				{command:'glitch',source:m.textContent},
				function(res){
					m.textContent = res.result;
				}
			);
			//m.textContent = m.textContent.split('').reverse().join('');
		}
	}
}


chrome.extension.sendRequest(
		{command:'anywhereEnable',url:document.location.href},
		function(res){
			if(res.enable){
				setInterval(function(){
					var textAreaFields = document.getElementsByTagName('textarea')
					for(var i=0;i<textAreaFields.length;i++){
						addButton(textAreaFields[i]);
					}
				},1000);
			}
		}
		);
