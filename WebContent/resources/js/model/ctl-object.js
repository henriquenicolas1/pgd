/**
 * Represents an object that can be translated to CTL
 * @author Jerônimo Nunes Rocha
 *
 */
class CtlObject {

	/**
	 * (constructor)
	 * @param ctlClassName The name of the sub-class of CTL
	 * @param simulation The Simulation of which this object belongs to
	 */
	constructor(ctlClassName,simulation){
		this.id = CtlObject.nextId;
		CtlObject.objects[this.id] = this;
		this.ctlClassName = ctlClassName;
		this.JQ = $('<div id="'+this.id+'" class="'+ctlClassName+'"/>');
		this.simulation = simulation;
	}

	/**
	 * @return The CtlObject of the given id
	 */
	static getObject(id){
		return CtlObject.objects[id];
	}

	/**
	 * @return The next available id
	 */
	static get nextId(){
		return CtlObject.id++;
	}

	/**
	 * @return the CTL string representing this object
	 * Could be overwritten by descendant classes
	 * but a generic implementation can be done here;
	 * TODO
	 */
	toString(){
		var result = "(make "+this.ctlClassName+" ";
		for(var i in this){
			if(i.startsWith("_")){
				if(typeof(this[i]) == "number"){
					result += "("+i.substring(1)+" "+this[i].toString().toLowerCase()+")";
				} else if(this[i] instanceof CtlObject || this[i] instanceof Vector3 || this[i] instanceof CtlList || this[i] instanceof Number || typeof(this[i])=="string"){
					result += "("+i.substring(1)+" "+this[i]+")";
				}
			}
		}
		return result+")\n";
	}

	/**
	 * Removes the GUI representation of this object and it's reference
	 * in the internal CtlObject keeper. Sub Classes should override this
	 * so it also deletes itself in the Simulation
	 */
	remove(){
		this.JQ.remove();
		CtlObject.objects[this.id] = undefined;
	}

};

//Static property that must hold the id of the last created CtlObject
CtlObject.id = 0;

//Function to clear references to created objects
CtlObject.clearCache = function(){
	CtlObject.objects = {};
}

//Static property that must hold all created objects
CtlObject.objects = {};