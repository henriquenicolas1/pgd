//TODO Java doc
class Vector3 {
	
	constructor(...args){
		this.x = args[0];
		this.y = args[1];
		this.z = args[2];
	}
	
	toString(){
		var result = "";
		if(this.x!=undefined){
			result+=this.x.toString().toLowerCase();
			if(this.y!=undefined){
				result+= " "+this.y.toString().toLowerCase();
				if(this.z!=undefined){
					result+= " "+this.z.toString().toLowerCase();
				}
			}
		}
		return result;
	}
}