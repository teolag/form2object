var form2object = function(form) {
	var obj = {};

	var names = [];
	var i, l=form.elements.length, input;

	for(i=0; i<l; i++) {
		input = form.elements[i];
		if(!input.name) continue;

		switch(input.nodeName) {
			case "INPUT":
				switch(input.type.toLowerCase()) {
					case "number":
						addValue(input.name, parseInt(input.value));
						break;
					case "radio":
					case "checkbox":
						if(!input.checked) continue;
						addValue(input.name, input.value);
						break;
					default:
						addValue(input.name, input.value);
				}
				break;

			case "SELECT":
				var j, k = input.children.length, option;
				for(j=0; j<k; j++) {
					option = input.children[j];
					if(option.selected) {
						addValue(input.name, option.value);
					}
				}
				break;
			case "TEXTAREA":
				addValue(input.name, input.value);
				break;
			case "BUTTON":
				break;
			default:
				throw new Error('Unknown nodeName: ' + input.nodeName);
		}
	}

	function addValue(name, value) {
		if(obj.hasOwnProperty(name)) {
			var o = obj[name];
			if(!Array.isArray(o)) {
				obj[name] = [o];
			}
			obj[name].push(value);
		} else {
			obj[name] = value;
		}
	}


	return obj;
}