window.addEventListener("load",function(){
		var fields = [];
		var inputs = document.getElementsByTagName("input");
		var textAreas = document.getElementsByTagName("textarea");
		for(var i=0;i<inputs.length;i++){fields.push(inputs[i]);}
		for(var i=0;i<textAreas.length;i++){fields.push(textAreas[i]);}

		for(var i=0;i<fields.length;i++){
			var field = fields[i];
			var val = localStorage[field.name];
			if(field.type=="checkbox"){
				if(val){
					field.checked = true;
				}else if(val == undefined){
					if(field.checked){
						localStorage[field.name] = "true";
					}else{
						localStorage[field.name] = "false";
					}
				}else{
					field.checked = false;
				}
			}else{
				if(val){
					field.value = val;
				}else{
					localStorage[field.name] = field.value;
				}
			}
		}
		document.getElementById("saveButton").addEventListener("click",function(e){
			for(var i=0;i<fields.length;i++){
				var field = fields[i];
				if(field.type=="checkbox"){
					if(field.checked == true){
						localStorage[field.name] = "true";
					}else{
						localStorage[field.name] = "false";
					}

				}else{
					localStorage[field.name] = field.value;
				}
			}
			window.alert("保存しました");
		});
});
