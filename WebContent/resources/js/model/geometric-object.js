/**
 * TODO Javadoc as Meep reference
 * @author Jerônimo Nunes Rocha
 *
 */
class GeometricObject extends CtlObject {
	
	constructor(ctlClassName,simulation){
		super(ctlClassName,simulation);
		this.JQ.addClass('geometric-object');
		this.material = undefined;
		this.center = new Vector3(0,0,null);
	}
	
	set material(material){
		this._material = material;
	}
	
	get material(){
		return this._material;
	}
	
	set center(center){
		this._center = center;
		var s = this.simulation;
		var r = s.params.resolution;
		var g = s.params['geometry-lattice'].size;
		this.JQ.css("top",-1*center.y*r+g.y*r/2-this.JQ.height()/2);
		this.JQ.css("left",center.x*r+g.x*r/2-this.JQ.width()/2);
	}
	
	get center(){
		return this._center;
	}
	
	/**
	 * Method that must be called when a significant property is changed
	 * so it will re-set all graphic properties. Must be overwritten so
	 * the child classes can also redraw their properties
	 */
	redraw(){
		this.center = this.center;
	}
	
	//@Override
	remove(){
		this.simulation.params.geometry.remove(this);
		super.remove();
	}
}