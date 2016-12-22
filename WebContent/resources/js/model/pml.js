//TODO Java doc and expand class
class Pml extends CtlObject {
	
	constructor(simulation){
		super("pml",simulation);
	}
	
	get thickness(){
		return this._thickness;
	}
	
	set thickness(thickness){
		this._thickness = thickness;
	}
}