//TODO Java doc
class Simulation {

	constructor(){
		this.JQ = $("<div class='simulation'>");
		var thiz = this;
		this.params = {
				_sources: new CtlList(thiz),
				_geometry: new CtlList(thiz),
				set ["geometry-lattice"](geometryLattice){
					this["_geometry-lattice"] = geometryLattice;
					thiz.JQ.append(geometryLattice.JQ);
				},
				get ["geometry-lattice"](){
					return this["_geometry-lattice"];
				},
				set geometry(geometry){
					this._geometry = geometry;
					for(let g of geometry){
						this["geometry-lattice"].JQ.append(g.JQ);						
					}
				},
				get geometry(){
					return this._geometry;
				},
				get ["pml-layers"](){
					return this["_pml-layers"];	
				},
				set ["pml-layers"](pmlLayers){
					this["_pml-layers"] = pmlLayers;	
				},
				get resolution(){
					return this._resolution;
				},
				set resolution(resolution){
					this._resolution = resolution;
					this["geometry-lattice"].size = this["geometry-lattice"].size;
					for(let g of this.geometry){
						g.redraw();
					}
					for(let s of this.sources){
						s.redraw();
					}
				},
				get sources(){
					return this._sources;
				},
				set sources(sources){
					this._sources = sources;
					for(let s of sources){
						this["geometry-lattice"].JQ.append(s.JQ);
					}
				},
				toString: function(){
					var result = "";
					for(var i of ["_geometry-lattice","_geometry","_pml-layers","_resolution","_sources"]){
						if(typeof(this[i]) == "number"){
							result += "(set! "+i.substring(1)+" "+this[i].toString().toLowerCase()+")\n";
						} else if(this[i] instanceof CtlObject || this[i] instanceof Vector3 || this[i] instanceof CtlList || this[i] instanceof Number || typeof(this[i])=="string"){
							result += "(set! "+i.substring(1)+" "+this[i]+")\n";
						}
					}
					return result;
				}
		}
	}
	
	get ["display-fluxes"] (){
		return this["_display-fluxes"];
	}
	
	set ["display-fluxes"] (fluxes) {
		this["_display-fluxes"] = fluxes;
		for(let g of fluxes){
			this.params["geometry-lattice"].JQ.append(g.JQ);
		}
	}
	
	addGeometricObject(c) {
		this.params.geometry.add(c);
		this.params["geometry-lattice"].JQ.append(c.JQ);
	}
	
	addSource(s) {
		this.params.sources.add(s)
		this.params["geometry-lattice"].JQ.append(s.JQ);
	}
	
	addFluxRegion(r) {
		this["display-fluxes"].add(r)
		this.params["geometry-lattice"].JQ.append(r.JQ);
	}

	toString() {
		var result = "(reset-meep)\n";
		result += this.params.toString();
		if(this["display-fluxes"] != undefined){
			result +="(display-fluxes" + this["display-fluxes"].toString() + ")\n";
		}
		if(this.runUntil){
			result += this.runUntil.toString();
		}
		return result;
	}

}