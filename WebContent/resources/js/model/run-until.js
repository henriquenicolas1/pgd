//TODO Java doc
class RunUntil {
	
	constructor(t){
		this.stepFunctions = [];
		this.time = t;
	}
	
	addStepFunction(func){
		this.stepFunctions.push(func);
	}
	
	getAtEvery(){
		for(var s of this.stepFunctions) {
			try {
				var v = /^at-every (\d+(\.\d+)?) output-efield-z$/.exec(s)[1];
				if(typeof(v)!=undefined) return v;
			} catch(e) {
				
			}
		}
	}
	
	toString(){
		var result = "";
		if(this.time){
			result+="(run-until "+this.time+" ";
			if(this.stepFunctions.length>0){
				result+="("+this.stepFunctions.join(')(')+")";
			}
			result+=")";
		}
		return result;
	}
}