/**
 * TODO Javadoc as Meep reference
 *
 */

class FluxRegion extends CtlObject{
	constructor(simulation){
		super('flux-region', simulation);
		//this.JQ.addClass('flux-region');
		this.center = new Vector3();
		this.size = new Vector3();
		var element = this.JQ[0];
		element.addEventListener("dblclick", new FluxRegionDoubleClickEventListener(this));
		//element.addEventListener("click", new SourceClickEventListender(this));
		
	}
	
	set ["add-flux"](addFlux){
		this.params["add-flux"]= addFlux;
	}
	
	get ["add-flux"](){
		return this.params["add-flux"];
	}
	
	set center(center){					//igual o Geometric Object. Preferi nao colocar no ctl-object, por medo.
		this._center = center;				
	}
	
	get center(){
		return this._center;
	}
	
	set size(size){		
		this._size = size;
		
		var s = this.simulation;
		var r = s.params['resolution'];
		var g = s.params['geometry-lattice'].size;
		
		var h = size.y*this.simulation.params['resolution'];
		var w = size.x*this.simulation.params['resolution'];
		this.JQ[0].style.height = h+"px";
		this.JQ[0].style.width = w+"px";
		
		this.JQ.css("top",-1*this._center.y*r+((g.y*r-h)/2));
		this.JQ.css("left",this._center.x*r+((g.x*r-w)/2));
		
	}
	
	get size(){
		return this._size;
	}
	
	set direction(direction){
		this._direction = direction;
	}
	
	get direction(){
		return this._direction;
	}
	
	redraw(){
		this.center = this.center;
		this.size = this.size;
	}
	
	//o ToString ateh agora sera o do super mesmo.
}

class FluxRegionDoubleClickEventListener {
	constructor(fluxRegion){
		this.fluxRegion = fluxRegion;
	}
	
	handleEvent(event){
		console.log(this.fluxRegion.id);
		for(var propertyName in this.fluxRegion) {
			if(propertyName[0] == '_'){
				console.log(propertyName + " : " + this.fluxRegion[propertyName]);
			 } 
		}
		PF('fluxRegion-id').jq.val(this.fluxRegion.id);
		for(var propertyName in this.fluxRegion) {
			if(propertyName[0] == '_'){
				if(propertyName == '_size'){
					PF('fluxRegion-size-x').jq.val(this.fluxRegion.size.x);
					PF('fluxRegion-size-y').jq.val(this.fluxRegion.size.y);
				}
				else if(propertyName == '_center'){
					PF('fluxRegion-center-x').jq.val(this.fluxRegion.center.x);
					PF('fluxRegion-center-y').jq.val(this.fluxRegion.center.y);
				}
				else{
					PF('fluxRegion-direction').jq.val(this.fluxRegion.direction);
				}	   
			 } 
		}
		for(var propertyName in this.fluxRegion.addflux) {
			if(propertyName != '_regions'){
				if(propertyName == '_df'){
					PF('fluxRegion-addflux-df').jq.val(this.fluxRegion.addflux.df);
				}
				else if(propertyName == '_fcen'){
					PF('fluxRegion-addflux-fcen').jq.val(this.fluxRegion.addflux.fcen);
				}
				else{
					PF('fluxRegion-addflux-nfreq').jq.val(this.fluxRegion.addflux.nfreq);
				}	   
			 } 
		}
		$("#source-pane").hide();
		$("#source-update-pane").hide();
		$("#cylinder-pane").hide();
		$("#cylinder-update-pane").hide();
		$("#block-pane").hide();
		$("#block-update-pane").hide();
		PF('layoutWidget').open('east');
		$("#fluxRegion-pane").show();
		$("#fluxRegion-update-pane").show();
	}
}

function updateFluxRegion(){
	
	var fluxRegion = CtlObject.getObject(PF('fluxRegion-id').jq.val());
	for(var propertyName in fluxRegion) {
		if(propertyName[0] == '_'){
			propertyName = propertyName.substring(1);
			   if(propertyName == 'center'){
				   fluxRegion.center = new Vector3(
						   parseFloat(PF('fluxRegion-center-x').jq.val()),
						   parseFloat(PF('fluxRegion-center-y').jq.val())
				   );				   
				   //fluxRegion.center.x = PF('fluxRegion-center-x').jq.val();
				   //fluxRegion.center.y = PF('fluxRegion-center-y').jq.val();
			   }else if(propertyName == 'size'){
				   fluxRegion.size = new Vector3(
						   parseFloat(PF('fluxRegion-size-x').jq.val()),
						   parseFloat(PF('fluxRegion-size-y').jq.val())
				   );
				   //fluxRegion.size.x = PF('fluxRegion-size-x').jq.val();
				   //fluxRegion.size.y = PF('fluxRegion-size-y').jq.val();
			   }
			   else{
				   fluxRegion.direction = PF('fluxRegion-direction').jq.val();
			   }
		}   
	}
	for(var propertyName in fluxRegion.addflux) {
		if(propertyName != '_regions'){
			if(propertyName == '_df'){
				fluxRegion.addflux.df= PF('fluxRegion-addflux-df').jq.val();
			}
			else if(propertyName == '_fcen'){
				fluxRegion.addflux.fcen = PF('fluxRegion-addflux-fcen').jq.val();
			}
			else{
				fluxRegion.addflux.nfreq = PF('fluxRegion-addflux-nfreq').jq.val();
			}	   
		 } 
	}
	
	fluxRegion.redraw();
}