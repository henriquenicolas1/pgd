//TODO Java doc
class CtlList {
	
	constructor(simulation){
		this.objects = [];
	}
		
	add(o){
		this.objects.push(o);
	}
	
	[Symbol.iterator]() {
		return this.objects[Symbol.iterator]();
	}
	
	toString(){
		var result = "(list ";
		this.objects.forEach(function(o){
			switch(typeof(o)){
				case "string":
				case "object":
					result+=o.toString()+" ";
					break;
				case "number":
					result+=o.toString().toLowerCase()+" ";
					break;
			}
		});
		return result+")";
	}
	
	/**
	 * Removes the given element of the list
	 */
	remove(o){
		var i = this.objects.indexOf(o);
		if(i>-1) this.objects.splice(i,1);
	}
}