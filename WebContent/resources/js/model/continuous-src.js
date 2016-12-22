//TODO Java doc and expand class
class ContinuousSrc extends CtlObject {
	
	constructor(simulation){
		super('continuous-src',simulation);
	}
	
	set frequency(frequency){
		this._frequency = frequency;
	}
	
	get frequency(){
		return this._frequency;
	}
} 