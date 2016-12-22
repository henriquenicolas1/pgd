class Revision {
	
	constructor(id,s){
		this.id = id;
		this.simulation = s;
		this.dirty = true;
	}
}

class Changes {
	
	constructor(){
		this.rev = 0;
		this.revs = [];
	}
	
	add(s) {
		this.revs.push(new Revision(++this.rev,s.toString()));
	}
	
	pop() {
		loadSimulation(this.revs.pop());
		this.rev--;
	}
	
	sync() {
		//TODO
	}
}