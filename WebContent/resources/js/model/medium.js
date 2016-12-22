//TODO Java doc
class Medium extends MaterialType {
	
	constructor(simulation){
		super("medium",simulation);
	}
	
	get epsilon(){
		return this._epsilon;
	}
	
	set epsilon(epsilon){
		this._epsilon = epsilon;
	}
}